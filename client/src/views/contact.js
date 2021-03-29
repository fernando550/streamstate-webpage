import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function Contact() {
  return (
    <>
      <Jumbotron />
      <div class="view-component container d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-start align-items-center">
          <h1 class="mb-5">Contact Us</h1>
        </div>
      </div>
    </>
  );
}
