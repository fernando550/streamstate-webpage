import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/store.context";
// images
import nuurdLogo from "../assets/images/nuurd_orange.png";

export const Navbar = () => {
  const {
    store: { user },
    actions: { user_func },
  } = useContext(Context);

  const links = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "About",
      path: "/about",
    },
    // {
    //   text: "Contact",
    //   path: "/contact",
    // },
    {
      text: user.isLoggedIn ? "Account" : "Login",
      path: "/login",
    },
  ];

  return (
    <nav className="navbar d-flex justify-content-between bg-dark">
      <div className="container h-100">
        <a className="navbar-brand h-100 d-flex align-items-center" href="/">
          <img src={nuurdLogo} height="27" alt="ssc-logo" />
        </a>
        <ul className="h-100 d-flex align-items-center text-white">
          {links.map((item, index) => {
            return (
              <li key={index}>
                <Link className="menu-link" to={item.path}>
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
