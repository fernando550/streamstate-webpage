import React, { useContext } from "react";
import { ProgressBar } from "../components/progressbar";
import { Description } from "../components/descriptionBox";

import { Context } from "../store/store.context";

export const TweetHistory = () => {
  const {
    store: { nuurd },
    actions: { nuurd_func },
  } = useContext(Context);

  return (
    <div>
      <Description
        text={
          <p>
            info: Enter a user handle to receive up to the latest 3200 tweets
            with tweet data such as location, time, and retweet count.
          </p>
        }
      />
      <div className="p-3 rounded-lg z-depth-5 bg-white">
        <div>
          <h4 className="bold">Tweet History Download</h4>
        </div>
        <div>
          <form
            id="form-tweet-history"
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
                  : "waves-effect waves-light")
              }
              type="submit"
              name="action"
            >
              Process
            </button>
          </form>
        </div>
        <div
          className=""
          style={{
            marginTop: "20px",
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
