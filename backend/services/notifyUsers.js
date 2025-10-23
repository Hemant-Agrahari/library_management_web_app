import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
export const notifyUsers = async () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const booksBorrowedOneDayAgo = await Borrow.find({
        dueDate: { $lte: oneDayAgo },
        returnedDate: null,
        notified: false,
      });
      for (const book of booksBorrowedOneDayAgo) {
        if (book.user && book.user.email) {
          sendEmail({
            email: book.user.email,
            subject: "Book Return Reminder",
            message: `Hello ${book.user.name},This is a reminder that the book ${book.book.title} is due today. Please return it to the library.If you not returned the book.If you have already returned the book, please ignore this email.`,
          });
          book.notified = true;
          await book.save();
        }
      }
    } catch (error) {
      console.error("Error in notifyUsers:", error);
    }
  });
};
