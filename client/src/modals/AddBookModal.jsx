import React from "react";
import closeIcon from "../assets/close-square.png";
import bookIcon from "../assets/book.png";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../store/slices/bookSlice";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";
import { Input } from "../components/common";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddBookModal = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.book);
  const { addBookPopup } = useSelector((state) => state.popUp);

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .required("Title is required"),
    author: Yup.string()
      .trim()
      .min(2, "Author must be at least 2 characters")
      .required("Author is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    quantity: Yup.number()
      .integer("Quantity must be a positive integer")
      .positive("Quantity must be a positive integer")
      .required("Quantity is required"),
    description: Yup.string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
      quantity: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addBook(values));
      dispatch(toggleAddBookPopup());
      formik.resetForm();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(toggleAddBookPopup());
  };

  if (!addBookPopup) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="w-full bg-white rounded-lg shadow-2xl max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <img src={bookIcon} alt="book icon" className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Book
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
            {/* Title */}
            <Input
              label="Title"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter book title"
              error={formik.touched.title && formik.errors.title}
              required
            />

            {/* Author */}
            <Input
              label="Author"
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter author name"
              error={formik.touched.author && formik.errors.author}
              required
            />

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <Input
                label="Price"
                type="number"
                step="0.01"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="0.00"
                error={formik.touched.price && formik.errors.price}
                required
              />

              {/* Quantity */}
              <Input
                label="Quantity"
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="0"
                error={formik.touched.quantity && formik.errors.quantity}
                required
              />
            </div>

            {/* Description */}
            <Input
              label="Description"
              type="textarea"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter book description"
              rows={4}
              error={formik.touched.description && formik.errors.description}
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
                {loading ? "Adding..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBookModal;
