import express from "express";
import { isAuthenticated, } from "../middlewares/authMiddlesWare.js";
import { borrowBook, recordBorrowBook, getBorrowedBooksForAdmin, returnBorrowedBook } from "../controllers/borrowController.js";
import { isAuthorized } from "../middlewares/authMiddlesWare.js";
const router = express.Router();
router.post("/record-borrow-book/:id", isAuthenticated,isAuthorized("Admin"), recordBorrowBook);
router.get("/borrowed-books-by-users", isAuthenticated,isAuthorized("Admin"), getBorrowedBooksForAdmin);
router.get("/my-borrowed-books", isAuthenticated, borrowBook);
router.put("/return-borrowed-book/:bookId", isAuthenticated,isAuthorized("Admin"), returnBorrowedBook);

export default router;