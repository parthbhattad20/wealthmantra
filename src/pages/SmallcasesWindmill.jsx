import React from "react";
import Navbar from "../components/HomeNav";
import Footer from "../components/Footer";

const SmallcaseCard = ({ name, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        View Smallcase
      </a>
    </div>
  );
}
const smallcases = [
  { name: "Alpha Blend - Market Leader", link: "https://smlc.se/J04x5" },
  { name: "Smallcap Akshat", link: "https://smlc.se/2Bt94" },
  { name: "Value and Momentum", link: "https://smlc.se/7xVX3" },
  { name: "SMALL CAP", link: "https://smlc.se/ggFOH" },
  { name: "OMNI Bullet Train", link: "https://smlc.se/HG0IK" },
  { name: "Mkj ffd pse", link: "https://smlc.se/VBJ37" },
  { name: "Teji Mandi Flagship", link: "https://smlc.se/W7VY7" },
  { name: "Quantace Infra Stars", link: "https://smlc.se/AXs8G" },
  { name: "Quantace 5 Trillion India", link: "https://smlc.se/wmmaE" },
  { name: "PSU Star", link: "https://smlc.se/G1QwY" },
  { name: "Top 5 sector in future", link: "https://smlc.se/aCgTm" },
  { name: "Dividend - Smart Beta", link: "https://smlc.se/Ey6es" },
  { name: "Zero Debt", link: "https://smlc.se/aocsC" },
  { name: "Bringing the Bling", link: "https://smlc.se/WdtvE" },
  { name: "House of Bajaj", link: "https://smlc.se/8bvKB" },
  { name: "Auto Tracker", link: "https://smlc.se/nkBiP" },
  { name: "Straight Flush", link: "https://smlc.se/Eiu4J" },
  { name: "Affordable Housing", link: "https://smlc.se/UbR3w" },
  { name: "House of Murugappa", link: "https://smlc.se/x0FqT" },
  { name: "Banking Privately", link: "https://smlc.se/NX7y6" },
  { name: "Transporting India", link: "https://smlc.se/do9CI" },
  { name: "Energy Tracker", link: "https://smlc.se/cGPWr" },
  { name: "House of Mahindra", link: "https://smlc.se/5cnmn" },
  { name: "Speciality Chemicals", link: "https://smlc.se/qK4bg" },
  { name: "House of HDFC", link: "https://smlc.se/ru7c6" },
  { name: "Metal Tracker", link: "https://smlc.se/0mMwX" },
  { name: "Low Risk - Smart Beta", link: "https://smlc.se/FKdvW" },
  { name: "FMCG Tracker", link: "https://smlc.se/UG7jD" },
  { name: "Banking Tracker", link: "https://smlc.se/oKTPE" },
  { name: "Equity & Debt", link: "https://smlc.se/MLto9" },
  { name: "Digital Inclusion", link: "https://smlc.se/uCOtx" },
  { name: "House of Tata", link: "https://smlc.se/XZpcY" },
  { name: "Top 250 Stocks", link: "https://smlc.se/vC13R" },
  { name: "Horizon 2035", link: "https://smlc.se/ix70R" },
  { name: "Horizon 2040", link: "https://smlc.se/SHPSA" },
  { name: "Horizon 2045", link: "https://smlc.se/hllsO" },
  { name: "Horizon 2050", link: "https://smlc.se/kCPXM" },
  { name: "Horizon 2055", link: "https://smlc.se/jqNfW" },
  { name: "Safe Haven", link: "https://smlc.se/wRkrO" },
  { name: "Electric Mobility", link: "https://smlc.se/7EhXo" },
  { name: "Insurance Tracker", link: "https://smlc.se/nnKca" },
  { name: "Quality - Smart Beta", link: "https://smlc.se/0HYQE" },
  { name: "Growth & Income", link: "https://smlc.se/kR95f" },
  { name: "Rising Rural Demand", link: "https://smlc.se/JdRtY" },
  { name: "The PE List", link: "https://smlc.se/NDv6K" },
  { name: "IT Tracker", link: "https://smlc.se/D8dwO" },
  { name: "CANSLIM-esque", link: "https://smlc.se/7BtcT" },
  { name: "Brand Value", link: "https://smlc.se/UWcKs" },
  { name: "PSU BANK INDEX", link: "https://smlc.se/CrBix" },
  { name: "Mkj FFD bargain stocks 2", link: "https://smlc.se/qoofV" },
  { name: "Mkj FFD Leaders", link: "https://smlc.se/T7KlN" },
  { name: "Mkj FFD Value stock 4", link: "https://smlc.se/w8VKK" },
  { name: "Mkj FFD Telecom", link: "https://smlc.se/5oYMp" },
  { name: "Mkj FFD NBFC 2", link: "https://smlc.se/kAclM" },
  { name: "Mkj FFD 2 wheel Auto", link: "https://smlc.se/PCrUo" },
  { name: "Mkj FFD Dusshera", link: "https://smlc.se/4bKXq" },
  { name: "Mkj FFD Value stocks 2", link: "https://smlc.se/Aewmj" },
  { name: "Mkj FFD Metal", link: "https://smlc.se/aXExJ" },
  { name: "Mkj FFD Electric Vehicle", link: "https://smlc.se/bmVhN" },
  { name: "Monopoly", link: "https://smlc.se/Z7mP7" }
];

function App() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Smallcases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {smallcases.map((smallcase, index) => (
          <SmallcaseCard key={index} name={smallcase.name} link={smallcase.link} />
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default App;
