import express from "express";
import { isAuthenticated, } from "../middlewares/authMiddlesWare.js";
import { borrowBook, recordBorrowBook, getBorrowedBooksForAdmin, returnBorrowedBook } from "../controllers/borrowController.js";
import { isAuthorized } from "../middlewares/authMiddlesWare.js";
const router = express.Router();
router.post("/record-borrow-book/:id", isAuthenticated,isAuthorized("admin"), recordBorrowBook);
router.get("/borrowed-books-by-users", isAuthenticated,isAuthorized("admin"), getBorrowedBooksForAdmin);
router.get("/my-borrowed-books", isAuthenticated, borrowBook);
router.put("/return-borrowed-book/:bookId", isAuthenticated,isAuthorized("admin"), returnBorrowedBook);

export default router;