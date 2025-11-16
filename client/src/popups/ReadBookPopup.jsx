import React from "react";
import { X, BookOpen, User, FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleReadBookPopup());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Book Details
          </h2>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {book ? (
            <div className="space-y-6">
              {/* Title Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                      Title
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {book.title || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Author Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                      Author
                    </label>
                    <p className="text-lg text-gray-900">
                      {book.author || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                      Description
                    </label>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {book.description ||
                        "No description available for this book."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info if available */}
              {(book.isbn || book.publishedYear || book.genre) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {book.isbn && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                        ISBN
                      </label>
                      <p className="text-base text-gray-900">{book.isbn}</p>
                    </div>
                  )}
                  {book.publishedYear && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                        Published Year
                      </label>
                      <p className="text-base text-gray-900">
                        {book.publishedYear}
                      </p>
                    </div>
                  )}
                  {book.genre && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 block">
                        Genre
                      </label>
                      <p className="text-base text-gray-900">{book.genre}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No book data available</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
