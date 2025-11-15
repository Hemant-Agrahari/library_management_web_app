import React from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from "../store/slices/borrowSlice";
import { fetchAllBooks } from "../store/slices/bookSlice";
import { resetBorrowSlice } from "../store/slices/borrowSlice";
import { useState } from "react";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import Header from "../layout/Header";
import { BookA } from "lucide-react";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import { useEffect } from "react";

const Catalog = () => {
  const dispatch = useDispatch();
  const { returnBookPopup } = useSelector((state) => state.popUp);
  const { allBorrowedBooks, message, error, loading } = useSelector(
    (state) => state.borrow
  );
  const { readBookPopup } = useSelector((state) => state.popUp);
  const [filter, setFilter] = useState("borrowed");
  const [readBook, setReadBook] = useState({});
  const openReadBookPopup = (borrowedBook) => {
    setReadBook(borrowedBook);
    dispatch(toggleReadBookPopup());
  };

  const formateDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    const formattedtime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formatedDate} ${formattedtime}`;
    return result;
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    return formatedDate;
  };

  const currentDate = new Date();
  const borrowedBooks = allBorrowedBooks.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });

  const overDueBooks = allBorrowedBooks.filter((book)=> {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  });

  const bookToDisplay = filter === "borrowed" ? borrowedBooks : overDueBooks;
  const [email, setEmail] = useState("");
  const [borrowedBook, setBorrowedBook] = useState("");
  const openReturnBookPopup = (bookId, userEmail) => {
    setBorrowedBook(bookId);
    setEmail(userEmail);
    dispatch(toggleReturnBookPopup());
  };

  useEffect(() => {
   if(message) {
    toast.success(message || error);
    dispatch(fetchAllBooks());
    dispatch(fetchAllBorrowedBooks());
    dispatch(resetBorrowSlice());
   }
   if(error) {
    toast.error(error);
    dispatch(resetBorrowSlice());
   }
  }, [dispatch, message, error,loading]);
  return (
  <>
    <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            My Borrowed Books
          </h2>
        </header>
        <header className="flex flex-col gap-3 sm:flex-row md:items-center">
          <button
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg text-center border2 font-semibold py-2 w-full sm:w-72 ${
              filter === "borrowed"
                ? "bg-black text-white border-black"
                : "bg-gray-300 border-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setFilter("borrowed")}
          >
            Borrowed Books
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border2 font-semibold py-2 w-full sm:w-72 ${
              filter === "overDue"
                ? "bg-black text-white border-black"
                : "bg-gray-300 border-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setFilter("overDue")}
          >
            Over Due Books
          </button>
        </header>
        <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-6">Id</th>
                <th className="text-left py-3 px-6">User Name</th>
                <th className="text-left py-3 px-6">User Email</th>
                <th className="text-left py-3 px-6">Book Price</th>
                <th className="text-left py-3 px-6">Due Date</th>
                <th className="text-left py-3 px-6">Date & Time</th>
                <th className="text-left py-3 px-6">Return Book</th>
              </tr>
            </thead>
            <tbody>
              {bookToDisplay && bookToDisplay.length > 0 ? (
                bookToDisplay.map((book, index) => (
                  <tr
                    key={book._id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="text-left py-3 px-6">{index + 1}</td>
                    <td className="text-left py-3 px-6">{book?.user.name}</td>
                    <td className="text-left py-3 px-6">{book.user.email}</td>
                    <td className="text-left py-3 px-6">{book.price}</td>
                    <td className="text-left py-3 px-6">
                      {formatDate(book.dueDate)}
                    </td>
                    <td className="text-left py-3 px-6">
                      {formateDateAndTime(book.borrowDate)}
                    </td>
                    <td className="text-left py-3 px-6">
                      {book.returnedDate ? (
                        <FaSquareCheck className="w-5 h-5 text-green-500 cursor-pointer hover:text-green-700" />
                      ) : (
                        <PiKeyReturnBold 
                          className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => openReturnBookPopup(book.book, book.user.email)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No {filter === "borrowed" ? "borrowed" : "overDue"}
                    books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {returnBookPopup && <ReturnBookPopup book={borrowedBook} email={email} />}
  </>
  );
};

export default Catalog;
