import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function Home() {
  return (
    <>
      <Jumbotron />
      <div class="view-component container d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-start align-items-center">
          <h1 class="mb-5">DEVELOPING PRACTICAL SOLUTIONS</h1>
          <h4 class="w-75 mb-5">
            Engineers and analysts on our team possess a passion for learning
            and the pursuit of excellence. Fine tuning your extensive needs,
            building trusting relationships, and executing effectively are the
            three drivers for our consulting style.
          </h4>
          <h4>
            This drives solutions that are delivered with you in mind, but
            nothing short of performant.
          </h4>
        </div>
      </div>
    </>
  );
}
