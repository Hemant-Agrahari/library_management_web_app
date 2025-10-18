import express from "express";
import { borrowBook, recordBorrowBook, getBorrowedBookForAdmin, returnBorrowedBook } from "../controllers/borrowController.js";
const router = express.Router();
import { isAuthenticated, authorized as isAuthorized } from "../middlewares/authMiddlesWare.js";
router.post("/record-borrow-book/:bookId", isAuthenticated,isAuthorized("Admin"), recordBorrowBook);
router.get("/borrowed-books-by-user", isAuthenticated,isAuthorized("Admin"), getBorrowedBookForAdmin);
router.get("/my-borrowed-books", isAuthenticated, borrowBook);
router.put("/return-borrowed-book/:bookId", isAuthenticated,isAuthorized("Admin"), returnBorrowedBook);


export default router;