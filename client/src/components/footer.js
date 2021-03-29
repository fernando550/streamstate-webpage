import React from "react";

import sscLogo from "../assets/images/logo-text-white.png";

export const Footer = () => {
  const data = {
    location: "Miami, FL",
    email: "fnarbona@streamstateconsulting.com",
    phone: "786-344-7889",
  };

  return (
    <div className="bg-dark text-white" style={{ height: "80px" }}>
      <div className="container py-3 h-100 d-flex flex-column justify-content-center">
        <div className="row d-flex flex-row align-items-center">
          <div className="col d-flex justify-content-center">
            <img height="25px" src={sscLogo} />
          </div>
          <div className="col d-flex justify-content-center">{data.location}</div>
          <div className="col d-flex justify-content-center">{data.email}</div>
          <div className="col d-flex justify-content-center">{data.phone}</div>
        </div>
      </div>
    </div>
  );
}
