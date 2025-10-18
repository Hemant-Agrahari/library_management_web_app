import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
export const borrowBook = catchAsyncError(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (user.quantity === 0) {
    return next(new ErrorHandler("Book is not available", 404));
  }
  const isAlreadyBorrowed = user.borrowedBook.find(
    (book) => book.bookId.toString() === bookId && book.returned === false
  );
  if (isAlreadyBorrowed) {
    return next(new ErrorHandler("Book is already borrowed", 404));
  }
  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();
  user.borrowedBook.push({
    bookId,
    returned: false,
    bookTitle: book.title,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await user.save();
  await Borrow.create({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    book: {
      book: book._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      price: book.price,
    },
  });
  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    borrow,
  });
});

export const recordBorrowBook = catchAsyncError(async (req, res, next) => {});
export const getBorrowedBookForAdmin = catchAsyncError(async (req, res, next) => {});
export const returnBorrowedBook = catchAsyncError(async (req, res, next) => {});
