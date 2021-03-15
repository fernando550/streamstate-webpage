import React from "react";

const RadioButton = props => {
  return (
    <label for={props.id} className="mr-3 text-white">
      <input
        className="with-gap"
        id={props.id}
        name={props.name}
        type="radio"
        checked={props.checked}
        onChange={props.onChange}
      />
      <span>{props.text}</span>
    </label>
  );
};

export const ParseMenu = props => {
  return (
    <div id="parse-menu" className="p-3 z-depth-5">
      <h4 className="bold mb-3">OPTIONS</h4>
      <div className="row ml-3">
        <div className="col-3 bg-dark mx-3 py-3 rounded-lg">
          <h6 className="bold mb-3 text-white">SEARCH TYPE</h6>
          <div>
            <RadioButton
              name="group1"
              id="friends"
              text="Friends"
              checked={props.parserType === "friends" ? true : false}
              onChange={props.changeParser}
            />
            <RadioButton
              name="group1"
              id="followers"
              text="Followers"
              checked={props.parserType === "friends" ? false : true}
              onChange={props.changeParser}
            />
          </div>
        </div>

        <div className="col-6 bg-dark mx-3 py-3 rounded-lg">
          <h6 className="bold mb-3 text-white">SAMPLING TYPE</h6>
          <div>
            <RadioButton
              name="group2"
              id="reverse"
              text="Reverse Chrono (default)"
              checked={props.sampling === "reverse" ? true : false}
              onChange={props.changeSampling}
            />
            <RadioButton
              name="group2"
              id="chrono"
              text="Chronological"
              checked={props.sampling === "chrono" ? true : false}
              onChange={props.changeSampling}
            />
            <RadioButton
              name="group2"
              id="random"
              text="Randomized"
              checked={props.sampling === "random" ? true : false}
              onChange={props.changeSampling}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
