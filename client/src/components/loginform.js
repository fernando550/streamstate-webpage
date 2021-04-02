import React from "react";

import nuurdLogo from '../assets/images/nuurd_orange.png';

export const LoginForm = ({error, username, password, handleSubmit, onInputChange}) => {
    return (
      <div>
        {error && <div id="login-warning" className="bg-danger text-center rounded-sm text-white p-1 mb-3">
          Invalid username or password, please try again
        </div>}
        <div id="login-box" className="p-5 z-depth-5 center-align">
          <div className="row d-flex justify-content-center">
            <img height="50px" src={nuurdLogo}/>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex flex-column p-5">
              <div className="input-field col mb-5">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="validate w-100"
                  value={username}
                  onChange={onInputChange}
                />
                <label htmlFor="username" id="usernamelabel">
                  Username:
                </label>
              </div>
              <div className="input-field col mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="validate w-100"
                  value={password}
                  onChange={onInputChange}
                />
                <label htmlFor="password" id="passwordlabel">
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
