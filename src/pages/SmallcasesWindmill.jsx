import React from "react";
import Navbar from "../components/HomeNav";
import Footer from "../components/Footer";

const smallcases = [
  { name: "Alpha Blend - Market Leader", url: "https://smlc.se/J04x5" },
  { name: "Smallcap Akshat", url: "https://smlc.se/2Bt94" },
  { name: "Value and Momentum", url: "https://smlc.se/7xVX3" },
  { name: "SMALL CAP", url: "https://smlc.se/ggFOH" },
  { name: "OMNI Bullet Train", url: "https://smlc.se/HG0IK" },
  { name: "Mkj ffd pse", url: "https://smlc.se/VBJ37" },
  { name: "Teji Mandi Flagship", url: "https://smlc.se/W7VY7" },
  { name: "Quantace Infra Stars", url: "https://smlc.se/AXs8G" },
  { name: "Quantace 5 Trillion India", url: "https://smlc.se/wmmaE" },
  { name: "PSU Star", url: "https://smlc.se/G1QwY" },
  { name: "ADITYA BIRLA SL IN", url: "https://smlc.se/0GJP2" },
  { name: "STIC", url: "https://smlc.se/90JwC" },
  { name: "NIFTY 50", url: "https://smlc.se/W7V48" },
  { name: "MID CAP", url: "https://smlc.se/AxKGJ" },
  { name: "Top 100 Market Cap", url: "https://smlc.se/GmNHo" },
  { name: "Rajesh Sekar", url: "https://smlc.se/AXsqU" },
  { name: "Insurance STAR", url: "https://smlc.se/3ZGvd" },
  { name: "Dividend STAR", url: "https://smlc.se/9lGN9" },
  { name: "Multicap Picks", url: "https://smlc.se/rwknk" },
  { name: "PMS FINS", url: "https://smlc.se/V2Sc4" },
  { name: "Teji Mandi Multicap", url: "https://smlc.se/JcEF8" },
  { name: "FIINANCE TOP", url: "https://smlc.se/A7Frk" },
  { name: "BU BND 3.0", url: "https://smlc.se/Og1Hy" },
  { name: "Streak Backtesting", url: "https://smlc.se/QeBfS" },
  { name: "Momentum Investments", url: "https://smlc.se/JZlxL" },
  { name: "Top Midsize Cap", url: "https://smlc.se/ba5yW" },
  { name: "Wings Star", url: "https://smlc.se/QdeTy" },
  { name: "MNC Star", url: "https://smlc.se/NOd15" },
  { name: "MIDCAP BY ADITYA", url: "https://smlc.se/LwxHo" },
  { name: "ICICI Large Cap", url: "https://smlc.se/Y7e80" },
  { name: "S&P STAR", url: "https://smlc.se/obAR1" },
  { name: "Teji Mandi Balanced", url: "https://smlc.se/eXgMm" },
  { name: "Fin Services MID CAP", url: "https://smlc.se/7mlJL" },
  { name: "Top Infra Picks", url: "https://smlc.se/45Gn8" },
  { name: "Growth Stars", url: "https://smlc.se/Qd3XR" },
  { name: "Top Value Buys", url: "https://smlc.se/WYGpA" },
  { name: "GREEN STAR", url: "https://smlc.se/JGrHl" },
];

const SmallcaseLinks = () => {
  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {smallcases.map((smallcase, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
        >
          <h2 className="text-lg font-bold mb-2">{smallcase.name}</h2>
          <a
            href={smallcase.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            View Smallcase
          </a>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default SmallcaseLinks;
