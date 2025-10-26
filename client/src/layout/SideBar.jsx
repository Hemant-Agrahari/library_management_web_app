import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { resetAuthSlice } from "../store/slices/authSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
const SideBar = ({ isSidebarOpen, setIsSidebarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNewAdminPopup } = useSelector((state) => state.popUp);
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [error, message, dispatch, isAuthenticated, user, loading]);

  return (
    <>
    <aside
      className={`${
        isSidebarOpen ? "left-0" : "-left-full"
      } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black flex-col h-full`}
      style={{ position: "fixed" }}
    >
      <div className="px-6 py-4 my-8">
        <img src={logo_with_title} alt="logo" />
      </div>
      <nav className="flex-1 px-6 space-y-2">
        <button
          className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center gap-2"
          onClick={() => setSelectedComponent("Dashboard")}
        >
          <img src={dashboardIcon} alt="dashboard" />
          <span>Dashboard</span>
        </button>

        <button
          className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center gap-2"
          onClick={() => setSelectedComponent("Book")}
        >
          <img src={bookIcon} alt="dashboard" />
          <span>Books</span>
        </button>
        {isAuthenticated && user?.role === "Admin" && (
          <>
            <button
              className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center gap-2"
              onClick={() => setSelectedComponent("Catalog")}
            >
              <img src={catalogIcon} alt="dashboard" />
              <span>Catalog</span>
            </button>
            <button
              className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center gap-2"
              onClick={() => setSelectedComponent("Book")}
            >
              <img src={usersIcon} alt="dashboard" />
              <span>Users</span>
            </button>
            <button className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" onClick={() => dispatch(toggleAddNewAdminPopup())}>
             
              <RiAdminFill className="w-5 h-5" /> <span >Add New Admin</span>
            </button>
          </>
        )}
        {isAuthenticated && user?.role === "User" && (
          <button
            className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center gap-2"
            onClick={() => setSelectedComponent("My Borrowed Books")}
          >
            <img src={catalogIcon} alt="my borrowed books" />
            <span>My Borrowed Books</span>
          </button>
        )}

        <button className="w-full py-2 font-medium text-white bg-transparent rounded-md hover:cursor-pointer flex items-center gap-2">
          <img src={settingIcon} alt="my borrowed books" />
          <span>Update Credentials</span>
        </button>
      </nav>
      <div className="px-6 py-4">
        <button 
          className="py-2 font-medium text-center text-white bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mx-auto w-fit"
          onClick={handleLogout}
        >
          <img src={logoutIcon} alt="logout" />
          <span>Log Out</span>
        </button>
      </div>
      <img src={closeIcon} alt="close" className="h-fit w-fit absolute top-0 right-4 cursor-pointer mt-4 block md:hidden" onClick={() => setIsSidebarOpen(false)} />
    </aside>
    {addNewAdminPopup && <AddNewAdmin />}
    </>
  );
};

export default SideBar;
