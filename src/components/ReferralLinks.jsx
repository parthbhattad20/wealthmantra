import React from "react";

const ReferralLinks = () => {
    return (
        <div className="flex justify-center space-x-5 mb-20">
            {/* Open an account with Zerodha */}
            <div className="flex flex-col items-center">
                <img
                    src="https://www.eklavvya.com/blog/wp-content/uploads/2022/03/Zerodha-Logo.png"
                    alt="Zerodha Logo"
                    className="h-[180px]"
                />
                <a href="https://zerodha.com/open-account?c=DJ7541" className="text-gray-900 hover:text-gray-300">
                    Open an account with Zerodha
                </a>
              
            </div>

            {/* Open an account with Upstox */}
            <div className="flex flex-col items-center">
                <img
                    src="https://pbs.twimg.com/profile_images/1735285577082134528/gAh2rfDQ_400x400.jpg"
                    alt="Upstox Logo"
                    className="h-[180px]"
                />
                <a href="https://incredmoney.app.link/JWG9wT344Mb" className="text-gray-900 hover:text-gray-300">
                    Open an account with  InCred Money
                </a>
              
            </div>
            <div className="flex flex-col items-center mt-10">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDcNmwll7MtWRjezpWE4ZApqaxmclARKkvdg&s"
                    alt="Upstox Logo"
                    className="h-[100px]"
                />
                <a href="https://smlc.se/o6N2Y" className=" hover:text-gray-300 text-gray-900 mt-10">
                    Open an account with   Smallcase
                </a>
             
            </div>
        </div>
    );
};

export default ReferralLinks;
