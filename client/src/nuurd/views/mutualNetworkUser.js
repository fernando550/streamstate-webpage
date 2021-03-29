import React, { useContext } from "react";
import { Description } from "../components/descriptionBox";
import { ProgressBar } from "../components/progressbar";
import { ParseMenu } from "../components/parsemenu";

import { Context } from "../../store/store.context";

export const MutualNetworkUser = (props) => {
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
              info: This function will find mutual followers and friends amongst
              a group of people, but will start with the input of a single user
              handle. This means you will not be able to select the group of
              users you want to analyze, however, this is the purpose of the
              single user function. You will be able to speculate and quantify
              the network of most recent followers or friends a user is
              reaching.
            </p>
            <ol>
              <li>
                Select the type of sampling you want from your data (The tool
                samples from a larger pool of recent data).
              </li>
              <li>
                Second, Select whether you want to pull followers or friends
                data.
              </li>
              <li>
                Third, enter the user handle you want to analyze (Note: do not
                include the '@' symbol in twitter handle names)
              </li>
            </ol>
          </div>
        }
      />
      <ParseMenu />
      <div className="p-3 rounded-lg z-depth-5 bg-white">
        <h4 className="bold">USER-PARSER</h4>
        <form
          id="form-network-user"
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
            display: nuurd.loading ? "block" : "none",
          }}
        >
          <p>{nuurd.message}</p>
          <ProgressBar loading={nuurd.loading} progress={nuurd.progress} />
        </div>
      </div>
    </div>
  );
};
