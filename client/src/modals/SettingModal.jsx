import React, { useEffect } from "react";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { updatePassword, resetAuthSlice } from "../store/slices/authSlice";
import { PasswordInput } from "../components/common";
import { useFormik } from "formik";
import * as Yup from "yup";

const SettingModal = () => {
  const dispatch = useDispatch();
  const { settingPopup } = useSelector((state) => state.popUp);
  const { loading, message, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required")
      .test(
        "passwords-different",
        "New password must be different from current password",
        function (value) {
          return value !== this.parent.currentPassword;
        }
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updatePassword(values));
    },
  });

  useEffect(() => {
    if (message) {
      handleClose();
      dispatch(resetAuthSlice());
    }
  }, [message]);

  const handleClose = () => {
    formik.resetForm();
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
          <form onSubmit={formik.handleSubmit} className="p-6">
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter current password"
              error={formik.touched.currentPassword && formik.errors.currentPassword}
              required
            />

            <PasswordInput
              label="New Password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter new password"
              error={formik.touched.newPassword && formik.errors.newPassword}
              required
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm new password"
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              required
              className="mb-2"
            />

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

export default SettingModal;

