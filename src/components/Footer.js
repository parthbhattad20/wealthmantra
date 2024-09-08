import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer class="bg-white rounded-lg shadow dark:bg-white m-4">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="https://flowbite.com/"
                        class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="./logoWM.jpeg"
                            alt="logo"
                            className="h-[50px]"
                        />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            WealthMantra
                        </span>
                    </a>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a
                                href="/about"
                                class="hover:underline me-4 md:me-6"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                class="hover:underline me-4 md:me-6"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/wealthmantra_50?igsh=OXVwcjRoY2Frd2lh"
                                class="hover:underline me-4 md:me-6"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.youtube.com/@WealthMantra_50"
                                class="hover:underline"
                            >
                                Youtube
                            </a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024{" "}
                    <a href="https://flowbite.com/" class="hover:underline">
                    WealthMantra
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
