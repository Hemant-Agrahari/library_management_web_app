import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import Header from "../layout/Header";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="relative md:pl-64 flex flex-col min-h-screen bg-gray-100">
      <div className="md:hidden z-10 absolute right-6 top-4 sm:top-4 flex items-center justify-center bg-black rounded-md h-9 w-9 text-white">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setSelectedComponent={setSelectedComponent}
      />
      
      {(() => {
        switch (selectedComponent) {
          case "Dashboard":
            return user.role === "User" ? (
              <UserDashboard />
            ) : (
              <AdminDashboard />
            );
            break;
          case "Books":
            return <BookManagement />;
          case "Catalog":
            if (user.role === "Admin") {
              return <Catalog />;
            }
            break;
            case "Users":
              if (user.role === "Admin") {
                return <Users />;
              }
              break;
            case "My Borrowed Books":
              return <MyBorrowedBooks />;
              break;
          default:
            return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
            break;
        }
      })()}
    </div>
  );
};

export default Home;
