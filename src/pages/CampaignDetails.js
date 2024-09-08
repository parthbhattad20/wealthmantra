import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CampaignUserFilters from "../components/CampaignUserFilters";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import config from "../config/config";
import axios from "axios";
import { useAuth } from "../utils/auth";

const DOMAINS_URL = `${config.apiBaseUrl}get/domains`;

function CampaignDetails() {

  const auth = useAuth();
  const { uuid, id } = useParams();
  const [campaignDetails, setCampaignDetails] = useState({
    emailTemplateId: id,
    campaignSubject: "",
    campaignEnvName: "",
    campaignEnvelopeEmailId: "",
    emailTemplateUUID: uuid,
    campaignName: "",
    domainId: "",
  });

  const [domain, setDomain] = useState({});
  const [domainList, setDomainList] = useState([]);

  const fetchDomains = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: DOMAINS_URL,
        headers: {
          authorization: auth.user.token,
        }
      });

      const data = res.data;

      if (data.domains.length > 0) {
        setDomainList([{ domainId: 0, domainName: "Select Domain" }, ...data.domains]);
      }

    } catch (e) {
      console.error(e);
    }
  };

  //preliminary testing
  useEffect(() => {
    fetchDomains();
  }, []);


  const handleChange = (e) => {
    setCampaignDetails({
      ...campaignDetails,
      [e.target.name]: e.target.value,
    });
  };

  
  

  return (
    <div className="flex bg-white">
      <div className="w-60">
        {" "}
        {/* Adjust the width as needed */}
        <Sidebar />
      </div>

      <div className="flex flex-grow relative flex-col">
        {" "}
        {/* Allow the Navbar to take remaining width */}
        <Navbar />
        <div id="PageContent" className="pt-30 mt-[81.5px]">
          <div id="PageContent" className="overflow-y-auto overflow-x-hidden ">
            <div className="py-2 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Campaign Details
              </h2>
              <div className="grid mt-6 gap-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="Campaign Name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Campaign Name
                      <span className="text-xs text-gray-500 ml-1"> : Not visible to recipients</span>
                    </label>
                    <input
                      type="text"
                      name="campaignName"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="campaignSubject"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Subject Name 
                      <span className="text-xs text-gray-500 ml-1"> : The subject line of the email</span>
                    </label>
                    <input
                      type="text"
                      name="campaignSubject"
                      id="campaignSubject"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="campaignEnvelopeEmailId"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Envelope ID 
                      <span className="text-xs text-gray-500 ml-1"> : Sender's email address without @domain.com</span>
                    </label>
                    <input
                      type="email"
                      name="campaignEnvelopeEmailId"
                      id="campaignEnvelopeEmailId"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="campaignEnvName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Envelope Name 
                      <span className="text-xs text-gray-500 ml-1"> : Sender's Name on the Envelope. Eg HR Team / John Doe</span>
                    </label>
                    <input
                      type="text"
                      name="campaignEnvName"
                      id="campaignEnvName"
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="Campaign Name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Domain Name:
                    </label>
                    <select
                      name="domainId"
                      value={domain}
                      onChange={(e) => { setDomain(e.target.value); handleChange(e) }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      id="domain-name"
                    >
                      {domainList.map((domain) => (
                        <option key={domain.domainId} value={domain.domainId}>
                          {domain.domainName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-2xl">
              <CampaignUserFilters campaignDetails={campaignDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;