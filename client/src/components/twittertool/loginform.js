import React from "react";

import nuurdLogo from '../../images/nuurd_orange.png';

export const LoginForm = props => {
    const warningStyle = {
      display: props.error ? "block" : "none",
    };

    return (
      <div>
        <div id="login-warning" className="red" style={warningStyle}>
          Invalid username or password, please try again
        </div>
        <div id="login-box" className="p-5 z-depth-5 center-align">
          <form onSubmit={props.handleSubmit}>
            <div className="row d-flex justify-content-center">
              <img height="50px" src={nuurdLogo}/>
            </div>
            <div className="row d-flex flex-column p-5">
              <div className="input-field col mb-5">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="validate w-100"
                  value={props.username}
                  onChange={props.onInputChange}
                />
                <label for="username" id="usernamelabel">
                  Username:
                </label>
              </div>
              <div className="input-field col mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="validate w-100"
                  value={props.password}
                  onChange={props.onInputChange}
                />
                <label for="password" id="passwordlabel">
                  Password:
                </label>
              </div>
            </div>
            <br />
            <button className="btn btn-dark" type="submit" name="action">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
