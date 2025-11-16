import React, { useState, useEffect } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchUserBorrowedBooks,
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";
import {
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleAddBookPopup,
} from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup"

const BookManagement = () => {
  const { books, loading, error, message } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const {
    addBookPopup,
    readBookPopup,
    recordBookPopup,
    returnBookPopup,
    settingPopup,
    addNewAdminPopup,
  } = useSelector((state) => state.popUp);
  const dispatch = useDispatch();
  const {
    loading: borrowLoading,
    error: borrowError,
    message: borrowMessage,
    allBorrowedBooks,
    userBorrowedBooks,
  } = useSelector((state) => state.borrow);
  const [readBook, setReadBook] = useState({});
  const [recordBook, setRecordBook] = useState("");
  const [returnBook, setReturnBook] = useState("");
  const [search, setSearch] = useState("");

  const openReadBookPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };
  const openRecordBookPopup = (bookId) => {
    setRecordBook(bookId);
    dispatch(toggleRecordBookPopup());
  };

  const searchBook = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );


  

  const handleSearch = () => {};

  useEffect(() => {
    if (message || borrowMessage) {
      toast.success(message || borrowMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchUserBorrowedBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if (error || borrowError) {
      toast.error(error || borrowError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [
    dispatch,
    message,
    borrowMessage,
    error,
    borrowError,
    loading,
    borrowLoading,
  ]);

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user?.role === "admin" ? "Book Management" : "My Borrowed Books"}
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {isAuthenticated && user?.role === "admin" && (
              <button
                className="relative pl-14 w-full sm:w-52 flex gap-4 justify-center items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
                onClick={() => dispatch(toggleAddBookPopup())}
              >
                <span className="bg-white grid place-items-center rounded-full text-black w-[25px] h-[25px] text-xl font-light leading-none absolute left-5">
                  +
                </span>
                Add New Book
              </button>
            )}
            <input
              type="text"
              placeholder="Search books"
              className="w-full sm:w-52 py-2 px-4 bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </header>

        {books && books.length > 0 && (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left py-3 px-6">Id</th>
                  <th className="text-left py-3 px-6">Name</th>
                  <th className="text-left py-3 px-6">Author</th>
                  {isAuthenticated && user?.role === "admin" && (
                    <th className="text-left py-3 px-6">Quantity</th>
                  )}
                  <th className="text-left py-3 px-6">Availability</th>
                  <th className="text-left py-3 px-6">Price</th>
                  {isAuthenticated && user?.role === "admin" && (
                    <th className="text-left py-3 px-6">Record Book</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {searchBook.map((book, index) => (
                  <tr
                    key={book._id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="text-left py-3 px-6">{index + 1}</td>
                    <td className="text-left py-3 px-6">{book.title}</td>
                    <td className="text-left py-3 px-6">{book.author}</td>
                    {isAuthenticated && user?.role === "admin" && (
                      <td className="text-left py-3 px-6">{book.quantity}</td>
                    )}
                    <td className="text-left py-3 px-6">
                      {book.availability ? "Available" : "Not Available"}
                    </td>
                    <td className="text-left py-3 px-6">{`$${book.price}`}</td>
                    {isAuthenticated && user?.role === "admin" && (
                      <td className="px-4 py-2 flex space-x-2 my-3 justify-center">
                        <BookA
                          className="w-5 h-5 text-blue-500"
                          onClick={() => openReadBookPopup(book._id)}
                        />
                        <NotebookPen
                          className="w-5 h-5 text-blue-500"
                          onClick={() => openRecordBookPopup(book._id)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {addBookPopup && <AddBookPopup/>}
      {readBookPopup && <ReadBookPopup book={readBook}/>}
      {recordBookPopup && <RecordBookPopup bookId={recordBook} />}
    </>
  );
};

export default BookManagement;
