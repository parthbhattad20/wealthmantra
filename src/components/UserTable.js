import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faUserPlus,
  faFileCsv,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../utils/auth";
import axios from "axios";
import Modal from ".//Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/config";

const USERS_URL = `${config.apiBaseUrl}user/getUsers`;
const CREATE_URL = `${config.apiBaseUrl}user/createUsers`;
const DELETE_URL = `${config.apiBaseUrl}user/deleteUsers`;
const DELETE_ALL_URL = `${config.apiBaseUrl}user/deleteAllUsers`;
const CSV_USERS_URL = `${config.apiBaseUrl}user/addUsers`;


//UserTable component
function UserTable() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [csvModal, setCsvModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [chunkId, setChunkId] = useState(1);
  const [chunkSize, setChunkSize] = useState(1);
  const auth = useAuth();

  //initialization call
  const fetchUser = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: USERS_URL,
        headers: {
          authorization: auth.user.token,
        },
        params: { id: auth.user.id,
        chunkId: chunkId,
      },
      });
      const data = res.data;
      if(data.pages!==-1){
        setChunkSize(data.pages);
      }
      setUsers(data.users);
      
    } catch (e) {
      toast.error(e);
    }
  };

  //add all effects here
  useEffect(() => {
    fetchUser();
    setCsvModal(null);
  }, [chunkId]);

  //function to handle select box
  const handleSelectChange = (e) => {
    const { name, checked } = e.target;
    let tempUser;
    if (name === "allSelect") {
      tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
    } else {
      tempUser = users.map((user) =>
        user.email === name ? { ...user, isChecked: checked } : user
      );
    }
    setUsers(tempUser);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const initialFormState = {
    firstName: "",
    lastName: "",
    emailId: "",
    groupName: "",
    departmentName: "",
    regionName: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // if (users.length > 10) {
      //   toast.error("You can only add up to 10 users at a time.");
      //   return;
      // }
      const response = await axios({
        method: "POST",
        url: CREATE_URL,
        headers: {
          authorization: auth.user.token,
        },
        data: formData,
      });
      if (response.status === 200) {
        await fetchUser();
        toast.success("User added successfully");
        setFormData(initialFormState);
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  //function to delete multiple selected users
  const handleDelete = async (userObj, e) => {
    if (
      window.confirm("Are you sure? The action is non-reversible. ") === true
    ) {
      try {
        var tempUser = [];
        if (Array.isArray(userObj)) {
          tempUser = userObj
            .filter((user) => user.isChecked)
            .map((user) => user.id);
        } else {
          tempUser[0] = userObj.id;
        }
        const response = await axios({
          method: "POST",
          url: DELETE_URL,
          headers: {
            authorization: auth.user.token,
          },
          data: { userIds: tempUser },
        });
        if (response.status === 200) {
          await fetchUser();
          toast.success("Users deleted successfully!");
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      return;
    }
  };

  const handleDeleteAll = async () => {
    if (
      window.confirm("Are you sure you want to delete all users? This action is non-reversible.") === true
    ) {
      try {
        const response = await axios({
          method: "POST",
          url: DELETE_ALL_URL,
          headers: {
            authorization: auth.user.token,
          },
        });
        if (response.status === 200) {
          await fetchUser();
          toast.success("All users deleted successfully!");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleCsvSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast.error("Please select a CSV file!");
      return false;
    }
    try {
      const formCsvData = new FormData();
      formCsvData.append("file", csvFile);

      // Make the Axios POST request to the backend API
      const response = await axios({
        method: "POST",
        url: CSV_USERS_URL,
        headers: {
          authorization: auth.user.token,
          "Content-Type": "form-data",
        },
        data: formCsvData,
      });
      console.log("Response data: ", response.data);
      if (response.status === 200) {
        fetchUser();
        setCsvFile(null);
        setCsvModal(false);
        toast.success("Users added successfully!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("An error occurred: ", error)
      toast.error("An error occurred... Please try again.");
      return false;
    }
  };

  return (
    <>
      <div className="px-6 py-0 my-4 bg-white">
        <div className="w-full place-center relative overflow-x-auto shadow-md sm:rounded-lg content-center m-2">
          <div className="flex flex-row-reverse space-x-3 items-center">
            <div className="px-3 ml-auto"></div>
            <div className="px-3">
              <button onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faUserPlus} size="2xl" />
              </button>
            </div>
            <div className="px-3">
              <button onClick={() => setCsvModal(true)}>
                <FontAwesomeIcon icon={faFileCsv} size="2xl" />
              </button>
            </div>

           
          </div>
          <table className="w-full text-sm text-left text-gray-500 m-2 p-2">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th score="col" className="px-4 py-3">
                  All{" "}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect"
                    checked={
                      users.filter((user) => user?.isChecked !== true).length <
                      1
                    }
                    onChange={handleSelectChange}
                  />
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Department
                </th>
                <th scope="col" className="px-4 py-3">
                  Region
                </th>
                {/* <th scope="col" className="px-4 py-3">
                                Group
                            </th> */}
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <UserData users={users}/> */}
              {users.map((curUser) => {
                return (
                  <tr
                    key={curUser.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={curUser.email}
                        checked={curUser?.isChecked || false}
                        onChange={handleSelectChange}
                      />
                    </td>
                    <td className="px-3 py-4">{curUser.name}</td>
                    <td className="px-3 py-4">{curUser.email}</td>
                    <td className="px-3 py-4">{curUser.department}</td>
                    <td className="px-3 py-4">{curUser.location}</td>
                    {/* <td className="px-3 py-4">{curUser.group}</td> */}
                    <td className="px-7 py-4">
                      <button onClick={(e) => handleDelete(curUser, e)}>
                        <FontAwesomeIcon icon={faTrashCan} size="xl" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex ">
          <div className="flex space-x-3 items-center px-3">
            <div>
              Page:
            </div>
            <div>
              <button
                onClick={() => {
                  if (chunkId > 1) {
                    setChunkId(chunkId - 1);
                  }
                }}
                disabled={chunkId <= 1}
              >
                <FontAwesomeIcon icon={faCircleArrowLeft} size="xl" />
              </button>
            </div>
            <div className="font-medium text-gray-500 whitespace-nowra">
              {chunkId}/{chunkSize}
            </div>
            <div>
              <button
                onClick={() => {
                  if (chunkId < chunkSize) {
                    setChunkId(chunkId + 1);
                  }
                }}
                disabled={chunkId >= chunkSize}
              >
                <FontAwesomeIcon icon={faCircleArrowRight} size="xl" />
              </button>
            </div>
          </div>
          <div className="px-3">
              <button
                onClick={handleDeleteAll}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                type="button">
                Delete All Users
              </button>
            </div>
            
          <button
            onClick={(e) => handleDelete(users, e)}
            className="ml-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            type="button"
          >
            Delete Selected Users
          </button>
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

        <div id="ModalContainer" className="overflow-y-auto overflow-x-hidden">
          <Modal isVisible={showModal} onClose={() => {
            setShowModal(false)
            setFormData({
              firstName: "",
              lastName: "",
              emailId: "",
              groupName: "",
              departmentName: "",
              regionName: "",
            })}}>

            <div className="py-0 px-4 mx-auto max-w-2xl lg:py-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Add a new user:
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 col-span-2 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      First Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Email:
                    </label>
                    <input
                      type="text"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Department:
                    </label>
                    <input
                      type="text"
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Region:
                    </label>
                    <input
                      type="text"
                      name="regionName"
                      value={formData.regionName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  {/* <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Group:
                    </label>
                    <input
                      type="text"
                      name="groupName"
                      value={formData.groupName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div> */}
                  <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <Modal
            isVisible={csvModal}
            onClose={() => {
              setCsvFile(null);
              setCsvModal(false);
            }}
          >
            <div className="py-0 px-4 mx-auto max-w-2xl lg:py-4">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Upload .csv / .xlsx file:
              </h2>
              <form
                onSubmit={(e) => {
                  return handleCsvSubmit(e);
                }}
              >
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                  className="file:rounded-xl file:mx-1 file:ml-auto file:text-white file:bg-blue-600 file:p-2 file:m-1 file:mt-1 file:mr-5 file:place-self-end text-gray-900"
                />
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                >
                  Add Users
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => {
                    setCsvFile(null);
                    setCsvModal(false);
                  }}
                >
                  Cancel
                </button>
              </form>
              <h4 className="mb-4 text-l text-gray-900">
                Use the following{" "}
                <a
                  href={process.env.PUBLIC_URL + "/sampleXLSXUpload.xlsx"}
                  className="underline text-blue-500"
                >
                  sample.
                </a>
              </h4>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default UserTable;
