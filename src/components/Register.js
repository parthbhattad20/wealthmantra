import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import config from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../login.png";
import ReCAPTCHA from "react-google-recaptcha";

const REGISTER_URL = `${config.apiBaseUrl}register/`;
const RECAPTCHA_SITE_KEY = "6Ld5EvMpAAAAAAQanel1RpHjBxVU5iBOyZ2Vmo9N";

function Register() {
  const [user, setUser] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: "",
    adminHost: "",
    adminSender: "",
    adminSenderPassword: "",
    adminPort: "",
    token: ""
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log("User data: ", user);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }
    if (user.adminPassword !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { adminName, adminEmail, adminPassword, adminHost, adminSender, adminSenderPassword, adminPort, token } = user;

    axios({
      method: "post",
      url: REGISTER_URL,
      data: { adminName, adminEmail, adminPassword, adminHost, adminSender, adminSenderPassword, adminPort, token, recaptchaToken },
    })
      .then((response) => {
        token = response.data.token;
        const userinfo = {
          token: token,
          username: user.email,
          id: response.data.id,
        };

        console.log("User Info: ", userinfo);

        auth.login(userinfo, false);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Registration failed! \n" + error.message);
        } else if (error.request) {
          toast.error("Request was made, but no response received. \n" + error);
        } else {
          toast.error("Error: \n" + error.message);
        }
      });
  };

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-cyan-300 to-blue-300 h-screen flex items-center justify-around py-12">
      <div className="w-1/3 flex justify-center h-auto">
        <img src={loginImage} alt="Register" />
      </div>
      <div className="w-full max-w-lg h-auto bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-xl py-5 px-8 border border-white border-opacity-50">
        <div className="flex flex-col items-center justify-evenly">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="PhishInstinct_black.png"
              alt="Phishinstinct"
            />
            <h2 className="mt-6 text-center text-2xl font-semibold leading-5 text-gray-900">
              Register your account
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-lg font-semibold leading-3 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    placeholder="Your username"
                    required
                    className="block bg-white w-full rounded-md border-2 p-2 text-gray-900 focus:ring-2 focus:ring-primary-300 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold leading-3 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="adminEmail"
                    type="email"
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="block bg-white w-full rounded-md border-2 p-2 text-gray-900 focus:ring-2 focus:ring-primary-300 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium leading-3 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="adminPassword"
                    type="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="block bg-white w-full rounded-md border-2 p-2 text-gray-900 focus:ring-2 focus:ring-primary-300 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-lg font-medium leading-3 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="block w-full bg-white rounded-md border-2 p-2 text-gray-900 focus:ring-2 focus:ring-primary-300 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#050C9C] hover:bg-[#3ABEF9] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Register;
