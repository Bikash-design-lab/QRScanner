import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <NavLink
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Back Home
      </NavLink>
    </div>
  );
};

export default NotFound;
