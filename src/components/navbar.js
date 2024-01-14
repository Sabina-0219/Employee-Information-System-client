import React from "react";
import "bootstrap/dist/css/bootstrap.css"; // Bootstrap: Make our application look better.
import { NavLink } from "react-router-dom";

// Display Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#5f9ea0",
            }}
          >
            Employees Information System
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link btn btn-success" // Add Bootstrap class for styling
                to="/create"
                style={{ 
                  marginRight: "10px",
                  color: "#20b2aa" 
                }} 
              >
                Create Record
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
