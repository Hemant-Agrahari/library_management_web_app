import express from 'express';
import { config } from 'dotenv';
config({ path: './config/config.env' });
export const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './database/db.js';
import { errorMiddleware } from './middlewares/errorMiddlewares.js';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import borrowRoutes from './routes/borrowRoutes.js';
import expressFileUpload from 'express-fileupload';
import userRoutes from './routes/userRouter.js';
import { notifyUsers } from './services/notifyUsers.js';
import { removeUnverifiedAccount } from './services/removeUnverifiedAccount.js';
connectDB();
notifyUsers();
removeUnverifiedAccount()
/*
    This is a middleware that allows the request to be made from the frontend to the backend
*/
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
}));
/*
    This is a middleware that parses the cookies of the request and makes it available in the req.cookies object
*/
app.use(cookieParser());
/*
    This is a middleware that parses the body of the request and makes it available in the req.body object
*/
app.use(express.json());
/*
    This is a middleware that parses the urlencoded data and makes it available in the req.body object
*/
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/borrow', borrowRoutes);
app.use('/api/v1/user', userRoutes);
app.use(errorMiddleware);