import React from "react";
import sscLogo from "../images/logo-blazing.png";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img height="50px" src={sscLogo} alt="ssc-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex flex-row justify-content-end text-white"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">
            <li>
                <Link className="menu-links" to="/">Home</Link>
            </li>
            <li>
              <Link className="menu-links" to="/about">About</Link>
            </li>
            <li>
              <Link className="menu-links" to="/contact">Contact</Link>
            </li>
            {/* <li><Link to="/location">Location</Link></li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
