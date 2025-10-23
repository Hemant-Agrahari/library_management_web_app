import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculator.js";
export const recordBorrowBook = catchAsyncError(async (req, res, next) => {
  const { id } = req.params || {};
  const { email } = req.body || {};

  // Validate email is provided
  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (book.quantity <= 0) {
    return next(new ErrorHandler("Book is out of stock", 400));
  }

  const isAlreadyBorrowed = user.borrowedBook.find(
    (book) => book.bookId.toString() === id && book.returned === false
  );

  if (isAlreadyBorrowed) {
    return next(new ErrorHandler("Book is already borrowed", 400));
  }
  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();
  user.borrowedBook.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });
  await user.save();
  await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    price: book.price,
  });
  res.status(200).json({
    success: true,
    message: "Book borrowed successfully",
  });
});

export const returnBorrowedBook = catchAsyncError(async (req, res, next) => {
  const { bookId } = req.params || {};
  const { email } = req.body || {};
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const borrowedBook = user.borrowedBook.find(
    (book) => book.bookId.toString() === bookId && book.returned === false
  );
  if (!borrowedBook) {
    return next(new ErrorHandler("You have not borrowed this book", 400));
  }
  borrowedBook.returned = true;
  await user.save();
  book.quantity += 1;
  book.availability = book.quantity > 0
  await book.save();
  const borrow = await Borrow.findOne({
    book: bookId,
    "user.email": email,
    returnedDate: null,
  });
  if (!borrow) {
    return next(new ErrorHandler("You have  not borrowed this book", 400));
  }
  borrow.returnedDate = new Date();
  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();
  res.status(200).json({
    success: true,
    message: fine !== 0 ? `The book has been returned successfully.The Total charge with fine are $${fine + book.price}` :`The book has been returned successfully .The total charges are $${book.price}`,
  });
});

export const borrowBook = catchAsyncError(async (req, res, next) => {
  const borrowedBooks = req.user.borrowedBook.filter(book => !book.returned);
  res.status(200).json({
    success: true,
    message: "Borrowed books fetched successfully",
    borrowedBooks,
  });
});
export const getBorrowedBooksForAdmin = catchAsyncError(
  async (req, res, next) => {
    const borrowedBooks = await Borrow.find();
    res.status(200).json({
      success: true,
      message: "Borrowed books fetched successfully",
      borrowedBooks,
    });
  }
);
