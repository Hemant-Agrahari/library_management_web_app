import React from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, loading, message, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* Left side */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center">
            <div className="flex justify-center mb-12">
              <img src={logo_with_title} alt="logo" className="h-44 w-auto" />
            </div>
            <p className="text-gray-300 text-lg">
              Enter the code sent to your email
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl">Verify OTP</h3>
                <img src={logo} alt="logo" className="w-24 h-24 object-cover" />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-8">
              Enter the code sent to your email
            </p>
            <p className="text-gray-600 text-center mb-8 text-sm">{email}</p>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the code"
                  required
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-black text-white rounded-md focus:outline-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
