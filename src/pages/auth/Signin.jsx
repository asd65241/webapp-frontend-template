import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth"; // Auth
import ProcessingBtn from "../../components/btn/ProcessingBtn";
import { ReactComponent as Logo } from "../../images/logo/Logo.svg";
import AuthImage from "../../images/auth-image.jpg";
import AuthVideo from "../../images/auth-video.mp4";
import AuthDecoration from "../../images/auth-decoration.png";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";

import Warning from "../../components/alert/Warning";
import Success from "../../components/alert/Success";

function Signin() {
  // Warning
  const [warning, setWarning] = useState();

  // Auth
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const loginHandlerTest = async (values, { setErrors, resetForm }) => {
    setLoading(true);
    console.log(formik.values);
    await setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const loginHandler = async (values, { setErrors, resetForm }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        endpoints.LOGIN_URL,
        JSON.stringify(formik.values),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(res?.data));

      // Set Auth Payload
      setAuth(res?.data);

      // Return to previous page
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);

      if (!err?.response) {
        console.error("No Server res");
      } else {
        let error = err?.response.data.errors.msg;
        setWarning(<Warning title="Invalid Login" />);
      }
    } finally {
      setLoading(false);
    }
  };

  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("This is not a valid email")
        .required("Email is required"),
      password: Yup.string().trim().required("Password is required"),
      // rememberMe: Yup.boolean(),
    }),
    onSubmit: loginHandler,
  });

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <Logo className="h-8 w-8" />
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Welcome back! ✨
              </h1>

              {/* Warning */}
              {warning}

              {/* Form */}
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      name="email"
                      className="form-input w-full"
                      type="string"
                      value={formik.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="text-red-600 text-sm">
                      {formik.errors.email && formik.touched.email
                        ? `Error: ${formik.errors.email}`
                        : null}
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      name="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                      value={formik.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="text-red-600 text-sm">
                      {formik.errors.password && formik.touched.password
                        ? `Error: ${formik.errors.password}`
                        : null}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input
                        name="rememberMe"
                        type="checkbox"
                        className="form-checkbox"
                        value={formik.rememberMe}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="text-sm ml-2">Remember me</span>
                    </label>
                  </div>
                </div> */}
                <div className="flex items-center justify-end mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  {!isLoading && (
                    <button
                      type="submit"
                      className="btn bg-sky-500 hover:bg-sky-600 text-white w-full"
                    >
                      Sign In
                    </button>
                  )}
                  {isLoading && <ProcessingBtn title="Sign In" />}
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm mb-6">
                  Don’t you have an account?{" "}
                  <Link
                    className="font-medium text-sky-500 hover:text-sky-600"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
                {/* Warning */}
                <Success title="To support you during the pandemic super pro features are free until March 31st." />
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          {/* Banner Image */}
          {/* <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          /> */}
          {/* End of Banner Image */}
          <video loop autoPlay className="w-full h-screen object-cover">
            <source src={AuthVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img
            className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          />
        </div>
      </div>
    </main>
  );
}

export default Signin;
