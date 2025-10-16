import express from "express";
import { isAuthenticated } from "../middlewares/authMiddlesWare.js";
import { addBook, deleteBook, getAllBooks } from "../controllers/bookController.js";
import { authorized } from "../middlewares/authMiddlesWare.js";
const router = express.Router();
router.post("/admin/add-book", isAuthenticated, authorized("Admin"), addBook);
router.get("/all",isAuthenticated, getAllBooks);
router.delete("/delete-book/:id", isAuthenticated, authorized("Admin"), deleteBook);

export default router;
