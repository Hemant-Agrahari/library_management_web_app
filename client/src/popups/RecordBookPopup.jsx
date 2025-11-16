import React, { useEffect } from "react";
import closeIcon from "../assets/close-square.png";
import bookIcon from "../assets/book.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { recordBorrowedBook } from "../store/slices/borrowSlice";
import { toast } from "react-toastify";
import { Input } from "../components/common";
import { useFormik } from "formik";
import * as Yup from "yup";

const RecordBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();
  const { recordBookPopup } = useSelector((state) => state.popUp);
  const { loading, message } = useSelector((state) => state.borrow);

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!bookId) {
        toast.error("Book ID is missing");
        return;
      }
      dispatch(recordBorrowedBook(values.email, bookId));
    },
  });

  // Close popup when operation is successful
  useEffect(() => {
    if (message) {
      handleClose();
    }
  }, [message]);

  const handleClose = () => {
    formik.resetForm();
    dispatch(toggleRecordBookPopup());
  };

  if (!recordBookPopup) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="w-full bg-white rounded-lg shadow-2xl max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <img src={bookIcon} alt="book icon" className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Record Book
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
            {/* Email */}
            <Input
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email address"
              error={formik.touched.email && formik.errors.email}
              required
              className="mb-2"
            />

            {/* Buttons */}
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
                {loading ? "Recording..." : "Record Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecordBookPopup;
