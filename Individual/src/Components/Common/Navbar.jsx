import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-white text-lg font-semibold hover:text-gray-400"
        >
          Home
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/About"
            className="text-white text-lg hover:text-gray-400"
          >
            About
          </NavLink>
          <NavLink
            to="/Graph"
            className="text-white text-lg border-2 px-2 rounded-full hover:text-gray-400"
          >
            Know Why?
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
