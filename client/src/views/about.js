import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function About() {
  return (
    <>
      <Jumbotron />
      <div className="view-component container d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-start align-items-center">
          <h1 className="mb-5">About Us</h1>
          <h4 className="w-75 mb-5">
            StreamState was born from the idea that technology consulting
            services aren't what they used to be. In an industry that is so
            rigorous, and where pressure is constantly applied to push out
            products and updates, it is crucial to practice good customer
            relations. Technology is so important to us, and we rely on it
            day-to-day, but knowing the teams behind your tech solutions will
            give you confidence in those products you use. Not only that, but in
            order to rely on customer service, we want our products to handle
            themselves. StreamState is pushing through to the Machine Learning
            and Artificial Intelligence segment of technology to bring
            self-sustaining products that will learn on your data and provide a
            level of detail not even human analysts could ever provide.
          </h4>
          <h4>This is a bright future, this is StreamState</h4>
        </div>
      </div>
    </>
  );
}
