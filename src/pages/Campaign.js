import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { useAuth } from "../utils/auth";
import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import config from "../config/config";
const GETTEMPLATES_URL = `${config.apiBaseUrl}S3/load`;
const UPLOADTEMPLATES_URL = `${config.apiBaseUrl}S3/upload`;

function Campaign() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [postRequestToggle, setPostRequestToggle] = useState(false);
  const auth = useAuth();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setHtmlContent(content);
      };
      reader.readAsText(file);
    }
  };
  const handleImageChange = (file) => {
    if (file.size > 100000) {
      //set react toast
      toast.error("Image size should be less than 100KB");
      // reset the image
      file = null;
      setImage(null);
    } else {
      setImage(file);
    }
  };
  useEffect(() => {
    setShowModal(false);
    async function fetchData() {
      const data = { id: `${auth.user.id}`, chunkId: `${1}` };
      try {
        const response = await axios.get(GETTEMPLATES_URL, {
          params: data,
          headers: { authorization: auth.user.token },
        });
        setTemplateData(response.data);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchData();
  }, [postRequestToggle]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (htmlContent == "" || text == "") {
      toast.error("Please enter valid details");
    } else {
      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("htmlContent", htmlContent);
        formData.append("name", name);
        const response = await axios({
          method: "POST",
          url: UPLOADTEMPLATES_URL,
          headers: {
            authorization: auth.user.token,
          },
          data: formData,
        });
        if (response.status !== 200) {
          toast.error("Error in uploading template");
        } else {
          setPostRequestToggle(!postRequestToggle);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="flex-none w-1/6">
          <Sidebar />
        </div>

        <div className="flex-initial w-5/6 bg-white">
          <Navbar />
          <div id="PageContent" className="pt-30 mt-[81.5px]">
            <div id="PageContent" className="overflow-y-auto overflow-x-auto">
              <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="max-w-2xl overflow-y-auto ">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Add Email Template
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-lg font-medium text-gray-900"
                    >
                      Template Name{" "}
                      <span className="text-xl pt-5 text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      pattern="[A-Za-z]{3,}"
                      onChange={handleNameChange}
                      value={name}
                      required
                      className="w-full p-3 border rounded-lg bg-gray-50 text-gray-900 focus:ring-primary-600 focus:border-primary-600"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <div className=" flex items-center">
                      <label
                        htmlFor="htmlFile"
                        className="block mb-2 text-lg font-normal text-gray-900"
                      >
                        Upload HTML File <span className="text-red-500">*</span>
                      </label>
                      <div className="group pb-2">
                        <svg
                          data-popover-target="html-info"
                          data-popover-placement="bottom"
                          className="w-3.5 h-3.5 text-gray-500 hover:text-gray-900 cursor-pointer ml-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466ZM10.5 4.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
                        </svg>

                        <div
                          id="html-info"
                          className="absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 transform scale-0 transform-origin-top-left group-hover:opacity-100 group-hover:scale-100 w-72"
                        >
                          <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-gray-900">
                              Upload Requirement
                            </h3>
                            <p>
                              Make sure that you have included the .URL and
                              .Tracker tags in the HTML content, or else by
                              default a button Named Proceed will be appended at
                              the end
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Dropzone
                      onChangeStatus={({ meta, file }, status) => {
                        if (status === "done") {
                          console.log("HTML File uploaded:", file);
                          handleFileChange(file);
                        } else if (status === "removed") {
                          setHtmlContent("");
                        }
                      }}
                      accept=".html"
                      maxFiles={1}
                      inputContent={() => (
                        <div
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          Drag and drop an .html file or Browse files
                        </div>
                      )}
                      styles={{
                        dropzone: {
                          border: "3px dashed #78c4ff",
                          borderRadius: "4px",
                          backgroundColor: "#f7fafc",
                          padding: "20px",
                          textAlign: "center",
                          overflowY: "hidden",
                          overflowX: "hidden",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        },
                        dropzoneActive: { borderColor: "#4CAF50" },
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="imageFile"
                      className="block mb-2 text-lg font-normal text-gray-900"
                    >
                      Upload Template Image
                    </label>
                    <Dropzone
                      onChangeStatus={({ meta, file }, status) => {
                        if (status === "done") {
                          handleImageChange(file);
                        } else if (status === "removed") {
                          setImage(null);
                        }
                      }}
                      accept="image/*"
                      maxFiles={1}
                      inputContent={() => (
                        <div
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          Drag and drop an image file or Browse files{" "}
                        </div>
                      )}
                      styles={{
                        dropzone: {
                          border: "3px dashed #78c4ff",
                          borderRadius: "4px",
                          backgroundColor: "#f7fafc",
                          padding: "20px",
                          textAlign: "center",
                          overflowY: "hidden", // Hide vertical scrollbar
                          overflowX: "hidden", // Hide horizontal scrollbar
                          scrollbarWidth: "none", // For Firefox
                          msOverflowStyle: "none", // For Internet Explorer
                        },
                        dropzoneActive: { borderColor: "#4CAF50" },
                      }}
                    />
                  </div>
                  <div className="text-center">
                    {" "}
                    {/* Center the button */}
                    <button
                      className="inline-flex items-center px-5 py-2.5 mt-0 text-sm font-semibold text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                      id="upload"
                      name="upload"
                      onClick={handleSubmit}
                    >
                      Add Template
                    </button>
                  </div>
                </div>
              </Modal>

              <div className="flex items-center my-5">
                <h1 className="font-bold text-3xl text-gray-700 ml-5 m-1">
                  {" "}
                  Campaign Templates
                </h1>
                <button
                  id="addTemplate"
                  className="text-white rounded-lg mx-1 ml-auto bg-blue-500 p-2 m-1 mr-5 place-self-end hover:bg-blue-600 "
                  onClick={() => setShowModal(true)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add new Template
                </button>
              </div>

              {templateData.length > 0 && (
                <div className="py-4 px-6 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {templateData.map((template, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-slate rounded-lg overflow-hidden border border-slate shadow-md w-full">
                        <div className="bg-white h-84">
                          <img
                            src={`data:image/png;base64,${template.img_file.data}`}
                            alt="Thumbnail"
                            className="object-contain w-full h-80 rounded-t-lg border-b border-gray-200"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="mb-2 text-2xl text-gray-800 truncate">
                            {template.name}
                          </h5>
                          <button
                            onClick={() =>
                              navigate(
                                `/campaigndetails/${template.UUID}/${template.ID}`
                              )
                            }
                            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-[#050C9C] hover:bg-[#3ABEF9]"
                          >
                            Use this template
                            <svg
                              className="w-4 h-4 ml-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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

export default Campaign;
