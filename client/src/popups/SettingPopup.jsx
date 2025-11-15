import React, { useState, useEffect } from "react";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { updatePassword, resetAuthSlice } from "../store/slices/authSlice";

const SettingPopup = () => {
  const dispatch = useDispatch();
  const { settingPopup } = useSelector((state) => state.popUp);
  const { loading, message, error } = useSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (message) {
      handleClose();
      dispatch(resetAuthSlice());
    }
  }, [message]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(updatePassword(passwordData));
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    dispatch(resetAuthSlice());
    dispatch(toggleSettingPopup());
  };

  if (!settingPopup) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="w-full bg-white rounded-lg shadow-2xl max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <img src={keyIcon} alt="key icon" className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Change Password
              </h3>
            </div>
            <img
              src={closeIcon}
              alt="close"
              className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
              onClick={handleClose}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleChangePassword} className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{message}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingPopup;
