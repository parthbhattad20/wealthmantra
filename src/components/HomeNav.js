import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-sans relative">
      <div className="navbar bg-white px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="./logoWM.jpeg" className="h-16 rounded-lg" alt="logo" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden z-50"> {/* Ensure z-index keeps the button on top */}
          <button onClick={toggleMenu} className="btn btn-ghost">
            {isOpen ? (
              <FaTimes className="h-6 w-6 mt-6 text-black" />
            ) : (
              <FaBars className="h-6 w-6 mt-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Full-Screen Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"  // Adjust z-index for full-screen menu
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-14 text-center">
                <li>
                  <Link
                    to="/about"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calculator"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                   Financial Calculators
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/wealthmantra_50?igsh=OXVwcjRoY2Frd2lh"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.youtube.com/@WealthMantra_50"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.linkedin.com/company/wealthmantra/?viewAsMember=true"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    to="/smallcaselist"
                    onClick={toggleMenu}
                    className="text-gray-800 text-xl font-bold hover:text-blue-800"
                  >
                    SmallcaseList
                  </Link>
                </li>
             
              
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar Center for Larger Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3 mt-4">
            <li>
              <Link to="/about" className="text-gray-800 text-base hover:text-blue-800">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-800 text-base hover:text-blue-800">
                Contact
              </Link>
            </li>
            <li>
                  <Link
                    to="/calculator"
                    className="text-gray-800 text-base  hover:text-blue-800"
                  >
                   Financial Calculators
                  </Link>
                </li>
            <li>
              <Link to="https://www.instagram.com/wealthmantra_50?igsh=OXVwcjRoY2Frd2lh" className="text-gray-800 text-base hover:text-blue-800">
                Instagram
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/@WealthMantra_50" className="text-gray-800 text-base hover:text-blue-800">
                Youtube
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/company/wealthmantra/?viewAsMember=true" className="text-gray-800 text-base hover:text-blue-800">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link to="/smallcaselist" className="text-gray-800 text-base hover:text-blue-800">
              SmallcaseList
              </Link>
            </li>
         
         
           
          </ul> 
        </div>
      </div>
    </div>
  );
}

export default Navbar;
