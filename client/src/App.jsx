import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/password/forgot" element={<ForgotPassword/>}/>
          <Route path="/otp-verification/:email" element={<OTP/>}/>
          <Route path="/password/reset/:token" element={<ResetPassword/>}/>
        </Routes>
        <ToastContainer theme='dark'/>
      </Router>
    </>
  );
};

export default App;
