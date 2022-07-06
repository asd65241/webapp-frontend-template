import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ReactComponent as Logo } from "../../images/logo/Logo.svg";
import AuthImage from "../../images/auth-image.jpg";
import AuthVideo from "../../images/auth-video.mp4";
import AuthDecoration from "../../images/auth-decoration.png";
import ProcessingBtn from "../../components/btn/ProcessingBtn";
import Modal from "../../components/modal/Modal";
import useModal from "../../hooks/useModal";
import endpoints from "../../api/endpoints";
import axios from "../../api/axios";

function ResetPassword() {
  const [modal, setModal] = useState();
  const [isLoading, setLoading] = useState(false);
  const { setIsModalOpen } = useModal();

  const submitHandlerTest = async (values, { setErrors, resetForm }) => {
    setLoading(true);
    console.log(formik.values);
    await setTimeout(() => {
      setLoading(false);

      // Show Modal
      setModal(
        <Modal
          title="Success!"
          message="Please check your email for verification link."
        />
      );
      setIsModalOpen(true);
    }, 2000);
  };

  const submitHandler = async (values, { setErrors, resetForm }) => {
    setLoading(true);

    try {
      const res = await axios.post(endpoints.FORGOTPW_URL, formik.values);
      const error_msg = res?.errors?.msg;

      setModal(
        <Modal
          title="Success!"
          message="Please check your email for verification link."
        />
      );
    } catch (err) {
      const error_msg = err.response?.errors?.msg;

      setModal(<Modal title="Error!" message="User does not exist" />);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("This is not a valid email")
        .required("Email is required"),
    }),
    onSubmit: submitHandler,
  });

  return (
    <main className="bg-white">
      {/* Modal Component */}
      {modal}
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
                Reset your Password ✨
              </h1>
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
                    />
                    <p className="text-red-600 text-sm">
                      {formik.errors.email
                        ? `Error: ${formik.errors.email}`
                        : null}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  {!isLoading && (
                    <button
                      type="submit"
                      className="btn bg-sky-500 hover:bg-sky-600 text-white whitespace-nowrap w-full"
                    >
                      Send Reset Link
                    </button>
                  )}
                  {isLoading && <ProcessingBtn title="Send Reset Link" />}
                </div>
              </form>
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

export default ResetPassword;
