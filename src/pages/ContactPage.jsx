import React from "react";
import Navbar from "../components/HomeNav";
import Footer from "../components/Footer";
import { FaInstagram,  FaYoutube,FaWhatsapp } from "react-icons/fa";

import { Link } from "react-router-dom";
const ContactPage = () => {
    return (
        <>
            <Navbar />
            <div class=" h-screen mt-20 grid sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-4xl bg-white font-[sans-serif]">
                <div>
                    <h1 class="text-gray-800 text-3xl font-extrabold">
                        Let's Talk
                    </h1>
                    <p class="text-sm text-gray-500 mt-4">
                     Want to join 
                    </p>

                    <div class="mt-12">
                        <h2 class="text-gray-800 text-base font-bold">Email</h2>
                        <ul class="mt-4">
                            <li class="flex items-center">
                                <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        fill="#007bff"
                                        viewBox="0 0 479.058 479.058"
                                    >
                                        <path
                                            d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                                <a
                                    href="javascript:void(0)"
                                    class="text-[#007bff] text-sm ml-4"
                                >
                                    <small class="block">Mail</small>
                                    <strong>wealthmantra50@gmail.com</strong>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-12">
                        <h2 class="text-gray-800 text-base font-bold">
                            Socials
                        </h2>

                        <ul class="flex mt-4 space-x-4">
                            <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <a href="https://www.instagram.com/wealthmantra_50?igsh=OXVwcjRoY2Frd2lh">
                                  <FaInstagram/> 
                                </a>
                            </li>
                            <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <a href="https://www.youtube.com/@WealthMantra_50">
                                  <FaYoutube/>
                                </a>
                            </li>
                            <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <a href=" https://chat.whatsapp.com/J4RDYAllFrrKdE29VXFhXR">
                                <FaWhatsapp/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <form class="ml-auto space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent"
                    />
                    <textarea
                        placeholder="Message"
                        rows="6"
                        class="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent"
                    ></textarea>
                    <button
                        type="button"
                        class="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6"
                    >
                        Send
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default ContactPage;
