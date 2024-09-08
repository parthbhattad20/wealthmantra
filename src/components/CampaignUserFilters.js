import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../utils/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config/config";
import { useNavigate } from "react-router";
import Modal from ".//Modal";

const GETFILTERDATA = `${config.apiBaseUrl}get/filterData`;
const STARTCAMPAIGN_URL = `${config.apiBaseUrl}campaign/createAndstartCampaign`;

function CampaignUserFilters(campaignDetails) {

    const auth = useAuth();
    const navigate = useNavigate();

    const [filterData, setFilterData] = useState([]);
    const [requestObject, setRequestObject] = useState({
        all: false,
        departments: [],
        locations: []
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: GETFILTERDATA,
                headers: {
                    authorization: auth.user.token
                }
            });

            setFilterData(response.data);
        } catch (error) {
            toast.error('Error fetching filter data:', error);
        }
    };

    const createAndStartCampaign = async () => {
        setLoading(true);
        try {
            const data = {
                campaignDetails: campaignDetails.campaignDetails,
                filters: requestObject,
            };
            const response = await axios({
                method: "POST",
                url: STARTCAMPAIGN_URL,
                headers: {
                    authorization: auth.user.token,
                },
                data: data,
            });
            if (response.status === 200) {
                toast.success("Emails sent!");
                setTimeout(() => navigate('/'), 1000);
            } else {
                toast.error(`Error : ${response.body}! Please try again later.`);
            }
        } catch (error) {
            toast.error(error);
        }
        setLoading(false);
    };

    const handleFilterChange = (e) => {
        const { name, checked, value } = e.target;
        if (name === "all" || (filterData.locations === requestObject.locations && filterData.departments === requestObject.departments)) {
            setRequestObject((prevRequestObject) => ({
                ...prevRequestObject,
                all: !prevRequestObject.all
            }));
        }
        else {
            if (checked) {
                // Checkbox is checked, add to the corresponding array
                if (name === "locations") {
                    setRequestObject((prevRequestObject) => ({
                        ...prevRequestObject,
                        locations: [...prevRequestObject.locations, value]
                    }));
                } else if (name === "departments") {
                    setRequestObject((prevRequestObject) => ({
                        ...prevRequestObject,
                        departments: [...prevRequestObject.departments, value]
                    }));
                }
            } else {
                // Checkbox is unchecked, remove from the corresponding array
                if (name === "locations") {
                    setRequestObject((prevRequestObject) => ({
                        ...prevRequestObject,
                        locations: prevRequestObject.locations.filter((location) => location !== value)
                    }));
                } else if (name === "departments") {
                    setRequestObject((prevRequestObject) => ({
                        ...prevRequestObject,
                        departments: prevRequestObject.departments.filter((department) => department !== value)
                    }));
                }
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    loading ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';

    return (
        <div className="flex justify-left mb-4">
            <div className="p-4">
                <h3 className="text-2xl font-bold mb-4">Select Target User groups: </h3>
                <div className="px-4">
                    <input
                        type="checkbox"
                        name="all"
                        id="all"
                        value='all'
                        checked={requestObject.all}
                        onChange={(e) => { handleFilterChange(e); }}
                        className="mr-2"
                    />
                    Send to all
                </div>
                <div className="flex">
                    {Object.keys(filterData).map((filterType) => (
                        <div key={filterType} className="mb-4 p-4">
                            <label className="block font-semibold mb-2">
                                {`Select by ${String(filterType)}:`}
                            </label>
                            {filterData[filterType].map((option) => (
                                <div key={option} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={filterType}
                                        name={filterType}
                                        value={option}
                                        onChange={(e) => { handleFilterChange(e); }}
                                        className="mr-2"
                                    // checked={selectedFilters[filterType].includes(option)}
                                    />
                                    <label htmlFor={option} className="cursor-pointer">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={() => { createAndStartCampaign(); }}
                    >
                        Create and Send Campaign
                    </button>
                </div>
            </div>
            <div id="ModalContainer" className="overflow-y-hidden overflow-x-hidden">
                <Modal isVisible={loading}>
                    <div className="py-0 px-4 mx-auto max-w-2xl lg:py-4">
                        <div className="flex flex-col items-center justify-center max-h w-60vw p-5 bg-white rounded-lg shadow-md">
                            <div className="py-4">
                                <h1 className="py-2 text-3xl font-bold text-gray-800">Your campaign has been created!</h1>
                            </div>
                            <div className="flex space-x-2 animate-ping py-10">
                                <div className="animate-bounce animate-pulse"><svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                                <div className="animate-bounce animate-pulse"><svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                                <div className="animate-bounce animate-pulse"><svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                                <div className="animate-bounce animate-pulse"><svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                                <div className="animate-bounce animate-pulse"><svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                                <div className="animate-bounce animate-pulse"><svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                                <div className="animate-bounce animate-pulse"><svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /> <polyline points="22,6 12,13 2,6" /></svg></div>
                            </div>
                            <p className="text-gray-600 text-xl mt-1">Kindly wait while the emails are being dispatched!</p>
                        </div>
                    </div>
                </Modal>
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
                theme="light" />
        </div>
    );
};

export default CampaignUserFilters;