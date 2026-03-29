import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/error404.css";

const Error404 = () => {
  return (
    <div className="error-container">

      <h1 className="error-code">404</h1>

      <h2 className="error-title">
        Oops! Page Not Found
      </h2>

      <p className="error-text">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <NavLink to="/">
        <button className="home-btn">
          Go Back Home
        </button>
      </NavLink>

    </div>
  );
};

export default Error404;