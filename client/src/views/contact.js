import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function Contact() {
  return (
    <div>
      <Jumbotron title={title} />
      <div class="view-component container d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-start align-items-center">
          <h1 class="title mb-5"></h1>
        </div>
      </div>
    </div>
  );
}

const title = 'Contact Us'