import React, { useContext } from "react";
import { Description } from "../components/descriptionBox";
import { ProgressBar } from "../components/progressbar";
import { ParseMenu } from "../components/parsemenu";

import { Context } from "../../store/store.context";

export const MutualNetworkFile = () => {
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
              a group of people. This means you will be able to speculate and
              quantify the immediate network of recent follower or friend
              relationships amongst a group of people.
            </p>
            <ol>
              <li>
                Select whether you want to pull followers or friends data.
              </li>
              <li>
                Select the type of sampling you want from your data (The tool
                samples from a larger pool of recent data).
              </li>
              <li>
                Upload a .csv file of names of people you wish to analyze (Note:
                do not include the '@' symbol in twitter handle names).
              </li>
            </ol>
          </div>
        }
      />
      <ParseMenu/>
      <div className="p-3 rounded-lg z-depth-5 bg-white">
        <h4 className="bold">FILE-PARSER</h4>
        <form
          id="form-network-file"
          className="d-flex align-items-center"
          onSubmit={nuurd_func.handleSubmit}
        >
          <div className="file-field input-field w-50">
            <div
              className={
                "btn " +
                (nuurd.loading
                  ? "disabled"
                  : "grey darken-2 d-flex align-items-center")
              }
            >
              <span>
                UPLOAD
                <i className="material-icons right" style={{ margin: "0px" }}>
                  file_upload
                </i>
              </span>
              <input
                type="file"
                name="file"
                id="fileUpload"
                onChange={nuurd_func.handleChange}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>

          <button
            className={
              "btn " +
              (nuurd.loading
                ? "disabled"
                : "grey darken-2 waves-effect waves-light ml-4")
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
          <ProgressBar progress={nuurd.progress} />
        </div>
      </div>
    </div>
  );
};
