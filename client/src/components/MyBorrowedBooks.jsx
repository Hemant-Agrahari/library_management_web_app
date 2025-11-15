import React from "react";
import { BookA } from "lucide-react";
import Header from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserBorrowedBooks } from "../store/slices/borrowSlice";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import ReadBookPopup from "../popups/ReadBookPopup";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const [readBook, setReadBook] = useState(null);
  const {
    loading: borrowLoading,
    error: borrowError,
    message: borrowMessage,
    userBorrowedBooks,
    allBorrowedBooks,
  } = useSelector((state) => state.borrow);
  const {
    addBookPopup,
    readBookPopup,
    recordBookPopup,
    returnBookPopup,
    settingPopup,
    addNewAdminPopup,
  } = useSelector((state) => state.popUp);

  useEffect(() => {
    dispatch(fetchUserBorrowedBooks());
  }, [dispatch]);

  const dateFormat = (timeStamp) => {
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
  const [filter, setFilter] = useState("returned");
  const returnedBooks = userBorrowedBooks.filter((book) => {
    return book.returnedDate !== null;
  });
  const nonReturnedBooks = userBorrowedBooks.filter((book) => {
    return book.returnedDate === null;
  });
  const bookToDisplay =
    filter === "returned" ? returnedBooks : nonReturnedBooks;

  const openReadBookPopup = (bookData) => {
    setReadBook(bookData);
    dispatch(toggleReadBookPopup());
  };

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
              filter === "returned"
                ? "bg-black text-white border-black"
                : "bg-gray-300 border-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setFilter("returned")}
          >
            Returned Books
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border2 font-semibold py-2 w-full sm:w-72 ${
              filter === "nonReturned"
                ? "bg-black text-white border-black"
                : "bg-gray-300 border-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setFilter("nonReturned")}
          >
            Non Returned Books
          </button>
        </header>
        <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-6">Id</th>
                <th className="text-left py-3 px-6">Book Title</th>
                <th className="text-left py-3 px-6">Date & Time</th>
                <th className="text-left py-3 px-6">Due Date</th>
                <th className="text-left py-3 px-6">Returned</th>
                <th className="text-left py-3 px-6">View</th>
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
                    <td className="text-left py-3 px-6">{book.book}</td>
                    <td className="text-left py-3 px-6">
                      {dateFormat(book.borrowDate)}
                    </td>
                    <td className="text-left py-3 px-6">
                      {dateFormat(book.dueDate)}
                    </td>
                    <td className="text-left py-3 px-6">
                      {book.returnedDate ? "Yes" : "No"}
                    </td>
                    <td className="text-left py-3 px-6">
                      <BookA
                        className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => openReadBookPopup(book)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No {filter === "returned" ? "returned" : "non-returned"}{" "}
                    books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};

export default MyBorrowedBooks;
