import React from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import defaultUserImg from "../assets/user.png";
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
import { useState, useEffect } from "react";
import Header from "../layout/Header";
import { fetchAllUsers } from "../store/slices/userSlice";

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

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popUp);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  console.log(totalAdmin,"total admin");
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    let numberOfUsers = users.filter((user) => user.role === "user");
    let numberOfAdmins = users.filter((user) => user.role === "admin");

    setTotalUsers(numberOfUsers);
    setTotalAdmin(numberOfAdmins);

    let numberOfTotalBorrowedBooks = allBorrowedBooks.filter(
      (book) => book.returnedDate === null
    );

    let numberOfTotalReturnedBooks = allBorrowedBooks.filter(
      (book) => book.returnedDate !== null
    );

    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);

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

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-gray-50 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
            
            {/* Left Section - Pie Chart */}
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Top Legend */}
              <div className="w-full flex items-center justify-center gap-6">
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
              <div className="w-full max-w-[400px] aspect-square bg-white p-8 rounded-2xl shadow-sm">
                <Pie data={data} options={options} />
              </div>

              {/* Bottom Legend */}
              <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <img src={logo} alt="logo" className="w-14 h-14" />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#1f1f1f]"></span>
                    <span className="text-sm font-medium">Total Borrowed Books</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#000000]"></span>
                    <span className="text-sm font-medium">Total Returned Books</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section - Stats Cards */}
            <div className="flex flex-col justify-center gap-6">
              {/* Total User Base */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                  <img src={usersIcon} alt="users" className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-bold text-gray-900">{totalUsers.length || 0}</h3>
                  <p className="text-gray-500 text-sm mt-1">Total User Base</p>
                </div>
              </div>

              {/* Total Book Count */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                  <img src={bookIcon} alt="books" className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-bold text-gray-900">{totalBooks}</h3>
                  <p className="text-gray-500 text-sm mt-1">Total Book Count</p>
                </div>
              </div>

              {/* Total Admin Count */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                  <img src={adminIcon} alt="admins" className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-bold text-gray-900">{totalAdmin.length || 0}</h3>
                  <p className="text-gray-500 text-sm mt-1">Total Admin Count</p>
                </div>
              </div>
            </div>

            {/* Right Section - Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-100 bg-gray-200">
                <img 
                  src={user?.avatar?.url || defaultUserImg} 
                  alt={user?.name || "User"} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultUserImg;
                  }}
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {user?.name || 'Admin User'}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Welcome to your admin dashboard. Here you can manage all the settings and monitor the statistics.
              </p>
            </div>
          </div>

          {/* Bottom Section - Quote */}
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <blockquote className="text-2xl md:text-3xl font-semibold text-gray-900 leading-relaxed mb-4">
              "Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character."
            </blockquote>
            <p className="text-gray-600 text-lg">~ BookWorm Team</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
