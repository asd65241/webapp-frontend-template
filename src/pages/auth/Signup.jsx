import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordStrengthBar from "react-password-strength-bar";

import useAuth from "../../hooks/useAuth"; // Auth
import ProcessingBtn from "../../components/btn/ProcessingBtn";
import { ReactComponent as Logo } from "../../images/logo/Logo.svg";
import AuthImage from "../../images/auth-image.jpg";
import AuthVideo from "../../images/auth-video.mp4";
import AuthDecoration from "../../images/auth-decoration.png";
import axios from "../../api/axios";

import endpoints from "../../api/endpoints";
import Warning from "../../components/alert/Warning";

function Signup() {
  // Warning
  const [warning, setWarning] = useState();

  // Auth
  const { setAuth, token, setToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const loginHandlerTest = async (values, { setErrors, resetForm }) => {
    setLoading(true);
    console.log(formik.values);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const loginHandler = async (values, { setErrors, resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        endpoints.REGISTER_URL,
        JSON.stringify(formik.values),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      setAuth(response?.data);

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);

      if (!err?.response) {
        console.error("No Server res");
      } else {
        let error = err?.response.data.errors.msg;
        console.log(error);
        setWarning(<Warning title="Invalid Input" />);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Form

  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirm_password: "",
      tnc: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("This is not a valid email")
        .required("Email is required"),
      firstName: Yup.string().trim().required("First name is required"),
      lastName: Yup.string().trim(),
      password: Yup.string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      tnc: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
    onSubmit: loginHandler
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
                Create your Account ✨
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
                      Email Address <span className="text-rose-500">*</span>
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
                      htmlFor="firstName"
                    >
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="firstName"
                      className="form-input w-full"
                      type="text"
                      value={formik.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="text-red-600 text-sm">
                      {formik.errors.firstName && formik.touched.firstName
                        ? `Error: ${formik.errors.firstName}`
                        : null}
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      className="form-input w-full"
                      type="text"
                      value={formik.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="text-red-600 text-sm">
                      {formik.errors.lastName && formik.touched.lastName
                        ? `Error: ${formik.errors.lastName}`
                        : null}
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="password"
                      className="form-input w-full"
                      type="password"
                      value={formik.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.values.password && (
                      <PasswordStrengthBar
                        minLength={8}
                        scoreWordClassName="text-sm font-medium"
                        password={formik.values.password}
                      />
                    )}
                    <p className="text-red-600 text-sm">
                      {formik.errors.password && formik.touched.password
                        ? `Error: ${formik.errors.password}`
                        : null}
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="confirm_password"
                    >
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="confirm_password"
                      className="form-input w-full"
                      type="password"
                      value={formik.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <p className="text-red-600 text-sm">
                      {formik.errors.confirm_password &&
                      formik.touched.confirm_password
                        ? `Error: ${formik.errors.confirm_password}`
                        : null}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input
                        name="tnc"
                        type="checkbox"
                        className="form-checkbox"
                        value={formik.tnc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="text-sm ml-2">
                        i agree to the terms and conditions
                      </span>
                    </label>
                    <p className="text-red-600 text-sm">
                      {formik.errors.tnc && formik.touched.tnc
                        ? `Error: ${formik.errors.tnc}`
                        : null}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  {!isLoading && (
                    <button
                      type="submit"
                      className="inline-block btn bg-sky-500 hover:bg-sky-600 text-white whitespace-nowrap w-full"
                      to="/"
                    >
                      Sign Up
                    </button>
                  )}
                  {isLoading && <ProcessingBtn title="Sign Up" />}
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className="text-sm">
                  Have an account?{" "}
                  <Link
                    className="font-medium text-sky-500 hover:text-sky-600"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </div>
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

export default Signup;
