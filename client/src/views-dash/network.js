import React, { useContext } from "react";
import { Description } from "../components/descriptionBox";
import { ProgressBar } from "../components/progressbar";
import { ParseMenu } from "../components/parsemenu";

import { Context } from "../store/store.context";

export const Network = (props) => {
  const {
    store: { nuurd },
    actions: { nuurd_func },
  } = useContext(Context);

  return (
    <div>
      <Description
        text={
          <div>
            <p>
              info: This function will find user information for up to 50,000
              friends or followers of a single user.
            </p>
          </div>
        }
      />
      <ParseMenu />
      <div className="p-3 rounded-lg z-depth-5 bg-white">
        <h4 className="bold">USER-PARSER</h4>
        <form
          id="form-network"
          className="d-flex flex-row align-items-center"
          onSubmit={nuurd_func.handleSubmit}
        >
          <div className="input-field w-50 mr-3">
            <input
              id="userName"
              type="text"
              className="validate"
              onChange={nuurd_func.handleChange}
            />
            <label htmlFor="userName">
              Enter a user handle (do not include the '@' symbol)
            </label>
          </div>

          <button
            className={
              "btn " +
              (nuurd.loading
                ? "disabled"
                : "grey darken-2 waves-effect waves-light")
            }
            type="submit"
            name="action"
          >
            Process
          </button>
        </form>
        <br />
        <div
          className=""
          style={{
            marginTop: "10px",
            display: nuurd.loading === "user-parser" ? "block" : "none",
          }}
        >
          <p>{nuurd.message}</p>
          <ProgressBar loading={nuurd.loading} progress={nuurd.progress} />
        </div>
      </div>
    </div>
  );
};
