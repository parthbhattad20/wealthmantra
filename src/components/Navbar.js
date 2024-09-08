import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import {
  faCircleUser,
  faBell,
  faChevronDown,
  faUser,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Modal from ".//Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/config";

const UPDATE_URL = `${config.apiBaseUrl}update/admin`;
const GET_ADMIN = `${config.apiBaseUrl}get/admin`;

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); //for dropdown
  const [showProfile, setShowProfile] = useState(false); //for modal
  const auth = useAuth();
  const navigate = useNavigate();
  const username = auth.user.username;
  const name = username.replace(/@.*/, "");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try {
      if (formJson.newpass1 !== formJson.newpass2) {
        throw new Error("New passwords do not match!");
      }
      const response = await axios({
        method: "POST",
        url: UPDATE_URL,
        headers: {
          authorization: auth.user.token,
        },
        data: {
          name: formJson.name,
          workEmail: formJson.email,
          newPassword: formJson.newpass1,
          oldPassword: formJson.password,
        },
      });
      if (response.status === 200) {
        toast.success("Details updated successfully!");
        setResetChoice(!resetChoice);
        setShowProfile(!showProfile);
        fetchAdmin();
      } else {
        toast.error("Something went wrong. Try again later!"); // You can handle this error in your UI if needed
        setResetChoice(!resetChoice);
      }
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error("Incorrect Password. Try again!");
      } else {
        toast.error(error.message);
      }
    }
  };

  const [resetChoice, setResetChoice] = useState(false);
  const [admin, setAdmin] = useState("");
  const fetchAdmin = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: GET_ADMIN,
        headers: {
          authorization: auth.user.token,
        },
      });
      const data = res.data;
      if (data) {
        setAdmin(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <nav className="bg-white pt-2 md:pt-1 pb-1 pr-4 md-10 h-20 top-0 z-40 flex justify-between items-center w-full fixed">
      <div className="flex items-center ml-auto mr-60 px-5 relative">
        {/* <FontAwesomeIcon icon={faBell} className="text-white text-4xl mr-4" /> */}
        <FontAwesomeIcon
          icon={faCircleUser}
          className="text-[#d8dee8] text-4xl mr-2"
        />
        <div className="flex cursor-pointer" onClick={toggleDropdown}>
          <p className="text-white text-xl">Welcome {admin.name}! </p>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-[#d8dee8] text-xl mt-1 px-2"
          />
          {isDropdownOpen && (
            <div className="dropdownlist fixed bg-white text-white right-0 mt-8 p-3 z-30 rounded-lg duration-150">
              {/* Dropdown content */}
              <ul className="p-1">
                <li>
                  <a
                    className="p-1 hover:bg-light-white text-white text-sm no-underline hover:no-underline block"
                    onClick={() => setShowProfile(true)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="ml-1"> Profile</span>
                  </a>
                </li>
                <div className="border border-gray-500"></div>
                <li>
                  <a
                    href="/login"
                    className="p-1 hover:bg-light-white text-white text-sm no-underline hover:no-underline block"
                    onClick={() => logout()}
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                    <span className="ml-1"> Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal for profile */}
      <div id="ModalContainer" className="overflow-y-auto overflow-x-hidden">
        <Modal
          isVisible={showProfile}
          onClose={() => {
            setResetChoice(false);
            setShowProfile(false);
          }}
        >
          <div className="py-0 px-4 mx-auto max-w-2xl lg:py-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Profile Information:
            </h2>
            {!resetChoice && (
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-2 mt-6 gap-4">
                  <div className="col-span-1 sm:col-span-2">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      {" "}
                      Name/Alias:{" "}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      pattern="[A-Za-z\s\S]{3,}"
                      defaultValue={admin.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Work Email:
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name="email"
                      id="email"
                      defaultValue={admin.workEmail}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      className="ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    >
                      Update Details
                    </button>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => setResetChoice(!resetChoice)}
                      className="ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            )}
            {resetChoice && (
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-2 mt-6 gap-4">
                  <div className="w-full sm:col-span-2">
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter Old Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name="password"
                      id="password"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div className="w-full sm:col-span-2">
                    <label
                      for="newpass1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name="newpass1"
                      id="newpass1"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div className="w-full sm:col-span-2">
                    <label
                      for="newpass2"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Re-enter New Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name="newpass2"
                      id="newpass2"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div className="w-full mt-auto">
                    <button
                      type="submit"
                      className="ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                    >preventDefault
                      Proceed Reset
                    </button>
                  </div>
                  <div className="w-full mt-auto">
                    <button
                      onClick={() => setResetChoice(false)}
                      className="ml-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </div>
      {/* End Modal */}

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
    </nav>
  );
}

export default Navbar;
