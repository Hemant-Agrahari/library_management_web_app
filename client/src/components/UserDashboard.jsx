import React from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.popUp);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  useEffect(() => {
    const numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    ).length;
    const numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    ).length;
    setTotalBorrowedBooks(
      userBorrowedBooks.filter((book) => book.returned === false).length
    );
    setTotalReturnedBooks(
      userBorrowedBooks.filter((book) => book.returned === true).length
    );
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#1f1f1f", "#000000"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-gray-50">
        <Header />
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 min-h-[85vh]">
          {/* Left Section - Action Cards */}
          <div className="flex flex-col gap-6 xl:gap-8 justify-start flex-1">
            {/* Borrowed Books Card */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer">
              <span className="w-[3px] bg-black h-16"></span>
              <span className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                <img src={bookIcon} alt="book" className="w-8 h-8" />
              </span>
              <p className="text-xl font-semibold">Your Borrowed Book List</p>
            </div>

            {/* Returned Books Card */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer">
              <span className="w-[3px] bg-black h-16"></span>
              <span className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                <img src={returnIcon} alt="return" className="w-8 h-8" />
              </span>
              <p className="text-xl font-semibold">Your Returned Book List</p>
            </div>

            {/* Browse Inventory Card */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer">
              <span className="w-[3px] bg-black h-16"></span>
              <span className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                <img src={browseIcon} alt="browse" className="w-8 h-8" />
              </span>
              <p className="text-xl font-semibold">Let's browse books inventory</p>
            </div>

            {/* Logo Section */}
            <div className="flex items-center justify-center mt-8">
              <img
                src={logo_with_title}
                alt="BookWorm Library"
                className="w-64 h-auto"
              />
            </div>

            {/* Footer Text */}
            <div className="text-center mt-auto">
              <p className="text-gray-600 text-lg">~ BookWorm Team</p>
            </div>
          </div>

          {/* Right Section - Pie Chart */}
          <div className="flex flex-col items-center justify-start flex-1 gap-8">
            {/* Top Legend */}
            <div className="w-full max-w-[500px] flex items-center justify-end gap-6 px-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-2 bg-[#1f1f1f]"></span>
                <span className="text-sm font-medium">Total Borrowed Books</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-2 bg-[#000000]"></span>
                <span className="text-sm font-medium">Total Returned Books</span>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="w-full max-w-[500px] aspect-square bg-white p-8 rounded-lg shadow-sm">
              <Pie data={data} options={options} />
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="w-16 h-16" />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#1f1f1f]"></span>
                    <span className="text-base font-medium">Total Borrowed Books</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#000000]"></span>
                    <span className="text-base font-medium">Total Returned Books</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
