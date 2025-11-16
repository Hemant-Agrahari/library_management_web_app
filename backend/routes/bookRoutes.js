import express from "express";
import { isAuthenticated } from "../middlewares/authMiddlesWare.js";
import { addBook, deleteBook, getAllBooks } from "../controllers/bookController.js";
import { isAuthorized } from "../middlewares/authMiddlesWare.js";
const router = express.Router();
router.post("/admin/add-book", isAuthenticated, isAuthorized("admin"), addBook);
router.get("/all",isAuthenticated, getAllBooks);
router.delete("/delete-book/:id", isAuthenticated, isAuthorized("admin"), deleteBook);

export default router;
