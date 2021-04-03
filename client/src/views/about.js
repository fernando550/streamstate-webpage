import React from "react";

import { Jumbotron } from "../components/jumbotron";

export function About() {
  return (
    <div>
      <Jumbotron title={title} />
      <div className="view-component d-flex flex-column justify-content-center align-items-center">
        <div className="container w-50 d-flex flex-column align-items-center">
          <h1 className="title">Hey there!</h1>
          <p className="mx-auto">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_9wjm14ni.json"
              background="transparent"
              speed="0.5"
              style={{ width: "450px" }}
              loop
              autoplay
            ></lottie-player>
          </p>
          <p>{string1}</p>
          <p>{string2}</p>
          <p>{string3}</p>
        </div>
      </div>
    </div>
  );
}

const title = "About Us";

const string1 = `StreamState was born from the idea that technology consulting services
aren't what they used to be. In an industry that is so rigorous, and
where pressure is constantly applied to push out products and updates,
it is crucial to practice good customer relations.`;

const string2 = `Technology is so important to us, and we rely on it 
day-to-day, but knowing the teams behind your tech solutions will give 
you confidence in those products you use. Not only that, but in order 
to rely on customer service, we want our products to handle themselves.`;

const string3 = `This is a bright future, this is StreamState`;

const string4 = `StreamState is pushing through
to the Machine Learning and Artificial Intelligence segment of
technology to bring self-sustaining products that will learn on your
data and provide a level of detail not even human analysts could ever
provide.`;
