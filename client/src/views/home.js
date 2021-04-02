import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function Home() {
  return (
    <>
      <Jumbotron />
      <div class="view-component container d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-start align-items-center">
          <h1 class="mb-5">Functional. Practical. Let's get you some data.</h1>
        </div>
      </div>
    </>
  );
}
