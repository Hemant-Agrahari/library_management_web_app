import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return next(new ErrorHandler("Please enter all fields", 400));
    }
    const isRegisteres = await User.findOne({ email, accountVerified: true });
    if (isRegisteres) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const registrationAttemptsByUser = await User.find({
      email,
      accountVerified: false,
    });
    if (registrationAttemptsByUser.length >= 5) {
      return next(
        new ErrorHandler(
          "You have reached the maximum number of registration attempts",
          400
        )
      );
    }
    if (password.length < 6 || password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 6 and 16 characters", 400)
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const verificationCode = user.generateVerificationCode();
    await user.save();
    await sendVerificationCode(email, verificationCode, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const verifyOtp = catchAsyncError(async (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.otp) {
    return next(
      new ErrorHandler("Email or OTP is required", 400)
    );
  }
  try {
    const { email, otp } = req.body || {};
    const userAllEntries = await User.findOne({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });
    if (!userAllEntries) {
      return next(new ErrorHandler("User not found", 400));
    }
    let user;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await user.deleteMany({
        _id: { $ne: userAllEntries._id },
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntries;
    }
    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP code", 400));
    }
    const currentDate = new Date();
    const verificationCodeExpires = new Date(
      user.verificationCodeExpires
    ).getTime();
    if (currentDate > verificationCodeExpires) {
      return next(new ErrorHandler("OTP code expired", 400));
    }
    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save({validateModifiedOnly:true});
    sendToken(user, 200, "Account Verified Successfully", res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const login = catchAsyncError(async (req, res, next) =>{
  const {email, password} = req.body || {};
  if(!email || !password){
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const user = await User.findOne({email,accountVerified:true}).select("+password");
  if(!user){
    return next(new ErrorHandler("User not found", 400));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if(!isPasswordMatched){
    return next(new ErrorHandler("email or password is incorrect", 400));
  }
  sendToken(user, 200, "User Login Successfully", res);
})

export const logout = catchAsyncError(async (req, res, next) =>{
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "User Logged Out Successfully",
  });
})