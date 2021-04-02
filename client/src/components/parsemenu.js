import React, { useContext } from "react";
import { Context } from "../store/store.context";

const RadioButton = props => {
  return (
    <label htmlFor={props.id} className="mr-3 text-white">
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

export const ParseMenu = () => {
  const {
    store: { nuurd },
    actions: { nuurd_func },
  } = useContext(Context);

  return (
    <div id="parse-menu" className="p-3 mb-3 z-depth-5">
      <h4 className="bold mb-3">OPTIONS</h4>
      <div className="row">
        <div className="col-lg-4 col-sm-5 bg-dark mx-3 py-3 rounded-lg">
          <h6 className="bold mb-3 text-white">SEARCH TYPE</h6>
          <div>
            <RadioButton
              name="group1"
              id="friends"
              text="Friends"
              checked={nuurd.search === "friends" ? true : false}
              onChange={nuurd_func.onChangeSearch}
            />
            <RadioButton
              name="group1"
              id="followers"
              text="Followers"
              checked={nuurd.search === "friends" ? false : true}
              onChange={nuurd_func.onChangeSearch}
            />
          </div>
        </div>

        <div className="col-lg col-sm-5 bg-dark mx-3 py-3 rounded-lg">
          <h6 className="bold mb-3 text-white">SAMPLING TYPE</h6>
          <div>
            <RadioButton
              name="group2"
              id="reverse"
              text="Reverse Chrono (default)"
              checked={nuurd.sampling === "reverse" ? true : false}
              onChange={nuurd_func.changeSampling}
            />
            <RadioButton
              name="group2"
              id="chrono"
              text="Chronological"
              checked={nuurd.sampling === "chrono" ? true : false}
              onChange={nuurd_func.changeSampling}
            />
            <RadioButton
              name="group2"
              id="random"
              text="Randomized"
              checked={nuurd.sampling === "random" ? true : false}
              onChange={nuurd_func.changeSampling}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
