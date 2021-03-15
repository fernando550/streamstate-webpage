import React from "react";

import sscLogo from "../images/logo-text-white.png";

export function Footer() {
  const email = "STREAMSTATECONSULTING@GMAIL.COM";

  return (
    <div class="bg-dark text-white" style={{ height: "80px" }}>
      <div class="container py-3 h-100 d-flex flex-column justify-content-center">
        <div class="row d-flex flex-row align-items-center">
          <div class="col d-flex justify-content-center">
            <img height="25px" src={sscLogo} />
          </div>
          <div class="col d-flex justify-content-center">Miami, FL</div>
          <div class="col d-flex justify-content-center">
            fnarbona@streamstateconsulting.com
          </div>
          <div class="col d-flex justify-content-center">786-344-7889</div>
        </div>
      </div>
    </div>
  );
}
