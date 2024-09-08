import React from "react";
import { useNavigate } from "react-router-dom";
import { VideoHome } from "../components/VideoHome";
import { Features } from "../components/Features";
import FAQs from "../components/Faqs";

function Home() {
    const phishesStyle = {
        backgroundImage: "linear-gradient(45deg,#1976D2,#0000FF)",
        WebkitBackgroundClip: "text",
        color: "transparent",
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="bg-white min-h-screen flex flex-col font-sans pt-8 md:pt-0">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Left Side Content */}
                    <div className="flex-auto w-full md:w-3/5 p-6 md:p-12 lg:p-20">
                        <div className="flex flex-col justify-center h-full">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 text-start md:text-left">
                           
                              
                                <span style={phishesStyle}>Welcome to Wealth Mantra! </span>
                            </h1>
                            <p className="text-gray-700 mb-6 text-lg md:text-xl lg:text-2xl leading-relaxed text-justify md:text-left">
                            Hi there! I'm Yogesh, and I’m beyond excited to welcome you to my stock market channel. Whether you're a seasoned pro or taking your very first steps into the world of investing, my goal is to provide you with the tools and insights to confidently navigate the stock market.
                            </p>
                            <div className="flex justify-center md:justify-start mt-6">
                                <button
                                    className=" bg-blue-700 text-white py-3 px-8 rounded-full shadow-md hover:shadow-xl hover:bg-blue-800 transition-transform transform hover:scale-105 font-medium"
                                    onClick={() => {
                                        navigate("/bookdemo");
                                    }}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-initial w-full md:w-2/5 mt-8 md:mt-0">
                        <div className="flex justify-center items-center h-full p-4 md:p-6 lg:p-8">
                            <img
                                className="max-w-full h-auto transform scale-x-[-1]"
                                src="./MM.gif"
                                alt="update photo"
                                style={{ marginTop: "-20px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <VideoHome />

            <FAQs />
        </>
    );
}

export default Home;
