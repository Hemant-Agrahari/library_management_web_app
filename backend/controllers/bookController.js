import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { isAuthenticated } from "../middlewares/authMiddlesWare.js";

export const addBook = catchAsyncError(async (req, res, next) => {
    const {title, author, description, price, quantity} = req.body || {};
    if(!title || !author || !description || !price || !quantity){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const book = await Book.create({title, author, description, price, quantity});
    res.status(201).json({
        success: true,
        message: "Book added successfully",
        book
    });
})
export const deleteBook = catchAsyncError(async (req, res, next) => {})
export const getAllBooks = catchAsyncError(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        books
    });
})