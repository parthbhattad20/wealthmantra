import React from "react";
import Navbar from "../components/HomeNav";
import Footer from "../components/Footer";
import TestimonialList from "./TestimonialsList";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-5 py-10">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl mt-10">
                        About Us
                    </h1>
                </div>

                {/* First Section */}
                <div className="sm:flex items-center">
                    <div className="sm:w-1/2 p-5">
                        <div className="image object-center text-center">
                            <img
                                src="https://i.imgur.com/WbQnbas.png"
                                alt="Company Logo"
                                className="mx-auto"
                            />
                        </div>
                    </div>
                    <div className="sm:w-1/2 p-5">
                        <div className="text">
                            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase"></span>
                            <h2 className="text-blue-700 my-4 font-bold text-3xl sm:text-4xl">
                                About{" "}
                                <span className="text-blue-700">
                                    WealthMantra
                                </span>
                            </h2>
                            <p className="text-gray-700">
                            Welcome to WealthMantra! Your go-to platform for mastering the stock market with confidence. At WealthMantra, we provide in-depth stock analysis, investment strategies, market insights, and educational content to help you make informed financial decisions. Whether you're a beginner or a seasoned investor, WealthMantra is here to guide you on your path to wealth creation and financial success.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Second Section */}
            </div>
            <TestimonialList/>
            <Footer />
        </>
    );
};

export default About;
