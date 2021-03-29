import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from '../store/store.context';
// images
import sscLogo from "../assets/images/logo-blazing.png";

export const Navbar = () => {
  const { store: { user }, actions: { user_func }} = useContext(Context);

  const links = [
    {
      text: "Home",
      path: "/"
    },
    {
      text: "About",
      path: "/about"
    },
    {
      text: "Contact",
      path: "/contact"
    },
    {
      text: user.isLoggedIn ? "Account" : "Login",
      path: "/login"
    }
  ]
  
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
            { links.map((item, index) => {
                return (
                  <li  key={index}>
                    <Link className="menu-links" to={item.path}>{item.text}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
