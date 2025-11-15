import React from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, message,isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append("email", values.email);
      data.append("password", values.password);
      dispatch(login(data));
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, loading, message, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>
  <div className="flex flex-col justify-center md:flex-row  h-screen">
        {/* left side */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12">
              Already have an account? Sign in to your account{" "}
            </p>
            <Link
              to="/login"
              className="border-2 rounded-lg font-semibold border-white px-8 py-2 hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden">
               Login
                </h3>
                <img
                  src={logo}
                  alt="logo"
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-12">
              Welcome back! Login to your account
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-black"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-black"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-black text-white rounded-md focus:outline-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Creating Account..." : "Sign Up"}</button>
              <Link to="/forgot-password" className="text-sm text-black-500 mt-6  font-bold hover:text-black-700 transition-all duration-300">Forgot Password?</Link>
              <div className="block md:hidden font-semibold mt-5">
                <p>Don't have an account? <Link to="/register" className="">Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
  </>;
};

export default Login;
