import express from 'express';
import { getAllUser, registerNewAdmin } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddlesWare.js';
import { isAuthorized } from '../middlewares/authMiddlesWare.js';
const router = express.Router();
router.get('/all-users',isAuthenticated,isAuthorized('admin'),getAllUser);
router.post('/add/register-admin',isAuthenticated,isAuthorized('admin'),registerNewAdmin);
export default router;