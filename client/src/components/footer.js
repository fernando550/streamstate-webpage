import React from "react";

import nuurdLogo from "../assets/images/nuurd_orange.png";

export const Footer = () => {
  return (
    <div className="footer bg-dark text-white">
      <div className="container-fluid py-3 h-100 d-flex flex-column justify-content-center">
        <div className="row d-flex flex-row align-items-center">
          <div className="col d-flex justify-content-center">{data.location}</div>
          <div className="col d-flex justify-content-center">{data.email}</div>
          <div className="col d-flex justify-content-center">{data.phone}</div>
        </div>
      </div>
    </div>
  );
}

const data = {
  location: "Miami, FL",
  email: "fnarbona@streamstateconsulting.com",
  phone: "786-344-7889",
};