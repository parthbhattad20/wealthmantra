// import React, { useState, useEffect } from "react";
// import Dropdown from "./DropDown";
// import axios from "axios";
// import { useAuth } from "../utils/auth";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import config from "../config/config";
// import { useNavigate } from "react-router";

// const USERS_URL = `${config.apiBaseUrl}user/getUsers`;
// const STARTCAMPAIGN_URL = `${config.apiBaseUrl}campaign/createAndstartCampaign`;

// function CampaignUserTable(campaignDetails) {
//   //managing all states
//   const [users, setUsers] = useState([]);
//   const [choice, setChoice] = useState(0);
//   const auth = useAuth();
//   const navigate = useNavigate();

//   //fetching list of users from backend
//   const fetchUser = async (url) => {
//     try {
//       const res = await axios({
//         method: "GET",
//         url: USERS_URL,
//         headers: {
//           authorization: auth.user.token,
//         },
//         params: { id: auth.user.id },
//       });
//       const data = res.data;
//       if (data.length > 0) {
//         setUsers(data);
//       }
//     } catch (e) {
//       toast.error(e);
//     }
//   };

//   const handleSend = async (event) => {
//     try {
//       const data = {
//         campaignDetails: campaignDetails.campaignDetails,
//         user_array: users,
//       };
//       const response = await axios({
//         method: "POST",
//         url: STARTCAMPAIGN_URL,
//         headers: {
//           authorization: auth.user.token,
//         },
//         data: data,
//       });
//       if (response.status === 200) {
//         toast.success("Emails sent!");
//         setTimeout(() => navigate('/'), 1000);
//       } else {
//         toast.error(`Error : ${response.body}! Please try again later.`);
//       }
//     } catch (error) {
//       //Correct way to handle res.sends() on error codes
//       toast.error(error.response.data);
//     }
//   };

//   // getting list of locations
//   const locations = [...new Set(users.map((user) => user.location))];
//   const locationlabels = locations.reduce((acc, location, index) => {
//     acc[index] = `${location}`;
//     return acc;
//   }, {});
//   const [locationChoice, setLocationChoice] = useState(0);

//   //getting list of departments
//   const departments = [...new Set(users.map((user) => user.department))];
//   const departmentlabels = departments.reduce((acc, department, index) => {
//     acc[index] = `${department}`;
//     return acc;
//   }, {});
//   const [departmentChoice, setDepartmentChoice] = useState(0);

//   //add all effects here on page load
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     handleChoiceChange();
//   }, [choice, locationChoice, departmentChoice]);

//   //function to handle checkboxes
//   const handleSelectChange = (e) => {
//     const { name, checked } = e.target;
//     let tempUser;
//     if (name === "allSelect") {
//       tempUser = users.map((user) => {
//         return { ...user, inc: checked };
//       });
//     } else {
//       tempUser = users.map((user) =>
//         user.name === name ? { ...user, inc: checked } : user
//       );
//     }
//     setUsers(tempUser);
//   };

//   //handling filters based on location and department
//   const handleChoiceChange = () => {
//     let tempUser;
//     if (choice === 0) {
//       tempUser = users.map((user) => {
//         return { ...user, inc: true };
//       });
//     } else if (choice === 1) {
//       //check all users having location as locationChoice
//       tempUser = users.map((user) => {
//         return user.location === locations[locationChoice]
//           ? { ...user, inc: true }
//           : { ...user, inc: false };
//       });
//     } else if (choice === 2) {
//       tempUser = users.map((user) =>
//         user.department === departments[departmentChoice]
//           ? { ...user, inc: true }
//           : { ...user, inc: false }
//       );
//     }
//     setUsers(tempUser);
//   };

//   return (
//     <div className="px-6 py-0 my-4">
//       <div className="w-full place-center relative overflow-x-auto shadow-md sm:rounded-lg content-center m-2">
//         <div className="flex">
//           <Dropdown
//             labels={{
//               0: "Select by Users",
//               1: "Select by Location",
//               2: "Select by Department",
//             }}
//             option={choice}
//             setOption={setChoice}
//           />
//           {choice === 0 && <></>}
//           {choice === 1 && (
//             <div>
//               <Dropdown
//                 labels={locationlabels}
//                 option={locationChoice}
//                 h-full
//                 setOption={setLocationChoice}
//               />
//             </div>
//           )}
//           {choice === 2 && (
//             <div>
//               <Dropdown
//                 labels={departmentlabels}
//                 option={departmentChoice}
//                 setOption={setDepartmentChoice}
//               />
//             </div>
//           )}
//         </div>
//         <div>
//           <table className="w-full text-sm text-left text-gray-500 m-2 p-2">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//               <tr>
//                 <th score="col" className="px-4 py-3">
//                   All{" "}
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     name="allSelect"
//                     checked={
//                       users.filter((user) => user?.inc !== true).length < 1
//                     }
//                     onChange={handleSelectChange}
//                   />
//                 </th>
//                 <th scope="col" className="px-4 py-3">
//                   Name
//                 </th>
//                 <th scope="col" className="px-4 py-3">
//                   Email
//                 </th>
//                 <th scope="col" className="px-4 py-3">
//                   Department
//                 </th>
//                 <th scope="col" className="px-4 py-3">
//                   Location
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((curUser) => (
//                 <tr
//                   key={curUser.name}
//                   className="bg-white border-b hover:bg-gray-50"
//                 >
//                   <td
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
//                   >
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name={curUser.name}
//                       checked={curUser?.inc || false}
//                       onChange={handleSelectChange}
//                     />
//                   </td>
//                   <td className="px-3 py-4">{curUser.name}</td>
//                   <td className="px-3 py-4">{curUser.email}</td>
//                   <td className="px-3 py-4">{curUser.department}</td>
//                   <td className="px-3 py-4">{curUser.location}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex">
//             <button
//               className="ml-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
//               type="button"
//               onClick={() => handleSend(users)}
//               // onClick={submitCampaign}
//             >
//               Send to Selected Users
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer 
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"/>
//     </div>
//   );
// }

// export default CampaignUserTable;
