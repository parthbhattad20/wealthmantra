import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBullhorn,
  faUsers,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import img from "../PhishInstinct_Logo.png";

function Sidebar() {
  const Options = [
    { title: "Dashboard", icon: faTableColumns, link: "/" },
    { title: "Charts", icon: faChartBar, link: "/charts" },
    { title: "Campaign", icon: faBullhorn, link: "/campaign" },
    { title: "Users", icon: faUsers, link: "/users" },
  ];

  return (
    <div className="bg-dark-purple h-screen w-1/6 fixed">
      <div className="p-2 h-20">
        <img src={img} alt="PhishInstinctLogo" />
      </div>
      <ul>
        {Options.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className="text-gray-300 text-lg flex items-center cursor-pointer py-2 px-4 hover:bg-light-white"
              activeClassName="bg-light-white text-purple-600"
            >
              <FontAwesomeIcon icon={item.icon} />
              <span className="p-2">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
