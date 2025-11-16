import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Book } from "../models/bookModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";

export const addBook = catchAsyncError(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body || {};
  if (!title || !author || !description || !price || !quantity) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
  });
  res.status(201).json({
    success: true,
    message: "Book added successfully",
    book,
  });
});

export const deleteBook = catchAsyncError(async (req, res, next) => {
  const { id } = req.params || {};
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  await book.deleteOne();
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    book,
  });
});

export const getAllBooks = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalBooks = await Book.countDocuments();
  const books = await Book.find().skip(skip).limit(limit);
  
  res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    books,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      limit,
      hasNextPage: page < Math.ceil(totalBooks / limit),
      hasPrevPage: page > 1
    }
  });
});
