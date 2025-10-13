import express from "express";
import { register, verifyOtp, login, logout } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddlesWare.js";
const router = express.Router();
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
export default router;