import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    borrowedBook: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        returned: {
          type: Boolean,
          default: false,
        },
        bookTitle: String,
        borrowedDate: Date,
        dueDate: Date,
      },
    ],
    avatar: {
      public_id: String,
      url: String,
    },
    verificationCode: {
      type: Number,
    },
    verificationCodeExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.generateVerificationCode = function(){
    function generateRandomFiveDigitNumber(){
        const fiveDigitNumber = Math.floor(Math.random() * 9) + 1;
        const remainingDigit = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return parseInt(fiveDigitNumber + remainingDigit);
    }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
  return verificationCode;
}



userSchema.methods.generateToken = function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});
}

export const User = mongoose.model("User", userSchema);
