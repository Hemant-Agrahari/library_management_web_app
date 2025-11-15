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
const Catalog = () => {
  const dispatch = useDispatch();
  const { returnBookPopup } = useSelector((state) => state.popUp);
  // const { books, loading, error, message } = useSelector((state) => state.book);
  const { allBorrowedBooks ,message,error,loading} = useSelector(
    (state) => state.borrow
  );
  const { readBookPopup } = useSelector((state) => state.popUp);
  const [readBook, setReadBook] = useState({});
  const openReadBookPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
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
  const [email,setEmail] = useState("");
  const [borrowedBook,setBorrowedBook] = useState("");
  const openReturnBookPopup = (id) => {
    const book = books.find((book)=>book._id === id);
    setBorrowedBook(book);
    setEmail(book.user.email);
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
  return <>Catalog</>;
};

export default Catalog;
