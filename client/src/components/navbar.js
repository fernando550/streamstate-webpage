import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from '../store/store.context';
// images
import nuurdLogo from "../assets/images/nuurd_orange.png";

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
    <nav className="nav-bar d-flex justify-content-between bg-dark">
        <a className="logo" href="/">
          <img src={nuurdLogo} alt="ssc-logo" />
        </a>
          <ul className="d-flex text-white">
            { links.map((item, index) => {
                return (
                  <li  key={index}>
                    <Link className="menu-links" to={item.path}>{item.text}</Link>
                  </li>
                )
              })
            }
          </ul>
      </nav>
  );
}
