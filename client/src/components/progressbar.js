import React from "react";

export const ProgressBar = props => {
  return (
    <div className="progress w-50 bg-dark text-white"
        style={{
              height: "25px"
            }}>
              <div style={{position: "absolute", top: "50%", marginLeft: "50%", fontSize: "14px"}}>{props.progress}</div>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated d-flex align-items-start pl-3"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{width: props.progress}}
        ></div>
      </div>
  );
};
