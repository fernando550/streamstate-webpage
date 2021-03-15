import React from "react";

const RadioButton = props => {
  return (
    <label for={props.id} className="mr-3 text-white">
      <input
        className="with-gap"
        id={props.id}
        name={props.group}
        type="radio"
        checked={props.checked}
      />
      <span>{props.text}</span>
    </label>
  );
};

export const ParseMenu1 = props => {
  return (
    <div id="parse-menu" className="p-3 z-depth-5">
      <h4 className="bold mb-3">OPTIONS</h4>
      <div className="row ml-3">
        <div className="col-3 bg-dark mx-3 py-3 rounded-lg">
          <h6 className="bold text-white">SEARCH TYPE</h6>
          <form onChange={props.changeParser}>
            <RadioButton
              name="group1"
              id="friends"
              text="Friends"
              checked={props.parserType === "friends" ? true : false}
            />
            <RadioButton
              name="group1"
              id="followers"
              text="Followers"
              checked={props.parserType === "friends" ? false : true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
