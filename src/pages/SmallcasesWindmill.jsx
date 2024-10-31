import React from "react";

const SmallcaseList = () => {
    const smallcases = [
        { title: "Dividend - Smart Beta", url: "https://smlc.se/h3kun" },
        { title: "Bringing the Bling", url: "https://smlc.se/guU2q" },
        { title: "House of Bajaj", url: "https://smlc.se/3Mf9g" },
        { title: "Auto Tracker", url: "https://smlc.se/rpo5h" },
        { title: "Straight Flush", url: "https://smlc.se/KYOBs" },
        { title: "Affordable Housing", url: "https://smlc.se/N2C9V" },
        { title: "House of Murugappa", url: "https://smlc.se/lXKk5" },
        { title: "Banking Privately", url: "https://smlc.se/OjnYi" },
        { title: "Infra Tracker", url: "https://smlc.se/5Meks" },
        { title: "Transporting India", url: "https://smlc.se/TnjoF" },
        { title: "Energy Tracker", url: "https://smlc.se/GBHno" },
        { title: "House of Mahindra", url: "https://smlc.se/9LoWr" },
        { title: "Speciality Chemicals", url: "https://smlc.se/Zdg1Z" },
        { title: "House of HDFC", url: "https://smlc.se/u5BfQ" },
        { title: "Metal Tracker", url: "https://smlc.se/RqLzu" },
        { title: "Low Risk - Smart Beta", url: "https://smlc.se/Ql63n" },
        { title: "FMCG Tracker", url: "https://smlc.se/ejs1z" },
        {
            title: "Quality Smallcap - Smart Beta",
            url: "https://smlc.se/j1sa5",
        },
        { title: "Banking Tracker", url: "https://smlc.se/AfHsi" },
        { title: "Equity & Debt", url: "https://smlc.se/ELkBX" },
        { title: "Digital Inclusion", url: "https://smlc.se/bWLOA" },
        { title: "Realty Tracker", url: "https://smlc.se/F2kAj" },
        { title: "House of Tata", url: "https://smlc.se/iljM3" },
        { title: "Top 250 Stocks", url: "https://smlc.se/10FAn" },
        { title: "Horizon 2030", url: "https://smlc.se/ZoKFO" },
        { title: "Horizon 2035", url: "https://smlc.se/b4QHo" },
        { title: "Horizon 2040", url: "https://smlc.se/6dydY" },
        { title: "Horizon 2050", url: "https://smlc.se/S1PIf" },
        { title: "Horizon 2055", url: "https://smlc.se/kHqoK" },
        { title: "Safe Haven", url: "https://smlc.se/yjN8r" },
        { title: "Electric Mobility", url: "https://smlc.se/ovw5k" },
        { title: "Insurance Tracker", url: "https://smlc.se/E5lXf" },
        { title: "Quality - Smart Beta", url: "https://smlc.se/d4suR" },
        { title: "The Naked Trader", url: "https://smlc.se/SdtsN" },
        { title: "Growth & Income", url: "https://smlc.se/lYeYM" },
        { title: "Rising Rural Demand", url: "https://smlc.se/xXH5i" },
        { title: "The PE List", url: "https://smlc.se/35KZL" },
        { title: "Pharma Tracker", url: "https://smlc.se/p2rdh" },
        { title: "IT Tracker", url: "https://smlc.se/uPVNh" },
        {
            title: "The Great Indian Middle Class",
            url: "https://smlc.se/vAQZQ",
        },
        { title: "CANSLIM-esque", url: "https://smlc.se/QbyWq" },
        { title: "Dividend Aristocrats", url: "https://smlc.se/j7KiM" },
        { title: "Brand Value", url: "https://smlc.se/JI3dz" },
        { title: "Value & Momentum", url: "https://smlc.se/E55mQ" },
        { title: "Growth at a Fair Price", url: "https://smlc.se/26Mhc" },
    ];

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    My Smallcases
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {smallcases.map((smallcase, index) => (
                        <a
                            key={index}
                            href={smallcase.url}
                            className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {smallcase.title}
                                </h2>
                                <p className="text-gray-600 truncate">
                                    {smallcase.url}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SmallcaseList;
