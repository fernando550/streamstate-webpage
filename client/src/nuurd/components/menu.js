import React from 'react';
import { Link } from "react-router-dom";

export const Menu = ({ logout }) => {
    const menuItems = [
      {
        path: "/dashboard/tweet-history",
        text: "Tweet History",
      },
      {
        path: "/dashboard/mutual-network-file",
        text: "SOI (file upload)",
      },
      {
        path: "/dashboard/mutual-network-user",
        text: "SOI (user input)",
      },
      {
        path: "/dashboard/network",
        text: "Friends/Followers",
      },
      {
        path: "/dashboard/help",
        text: "Help",
      },
      {
        path: "/logout",
        text: "Logout",
      }
    ];
  
    return (
      <div className="row mb-3">
        {menuItems.map((item, index) => {
          return (
            <div key={index} className="col p-0 dash-menu-item">
              <Link
                to={item.path}
                className="waves-effect waves-light px-3 text-white"
              >
                {item.text}
              </Link>
            </div>
          )
        })}
      </div>
    );
  };