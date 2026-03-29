import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../CSS/navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container">
        <NavLink className="navbar-brand logo" to="/home">
          Quiz-Web
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home/contact">Contact</NavLink>
            </li>
          </ul>

          {user ? (
            <div className="dropdown">
              <button className="btn btn-success" onClick={toggleDropdown}>
                {user.name} &#9662;
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <NavLink to="/home/my-results">My Results</NavLink>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink className="btn btn-primary" to="/">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;