import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import parallaxIMG from "../../assets/images/multicolor-laptop.jpg";

import { LoginForm } from "../components/loginform";
import { Parallax } from "react-parallax";

import { Redirect } from "react-router";
import { Context } from "../../store/store.context";

export function Login() {
  const { store, actions }= useContext(Context);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/ttapi/login", credentials)
      .then(({ data }) => {
        console.log("Response from login: ", data);
        // data === true ? setIsAuth(true) : setError(true)
        data === true ? actions.user_func.login() : setError(true);
      })
      .catch((error) => {
        console.log("Unexpected error: ", error);
      });
  };

  const onInputChange = (e) => {
    let { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
    error ? setError(false) : null;
  };

  return (
    <Parallax
      bgImage={parallaxIMG}
      strength={200}
      className="parallax-container d-flex justify-content-center p-20"
      bgImageStyle={{ top: "-20%" }}
    >
      {!store.user.isLoggedIn ? (
        <LoginForm
          handleSubmit={handleSubmit}
          onInputChange={onInputChange}
          username={credentials.username}
          password={credentials.password}
          error={error}
        />
      ) : (
        <Redirect to="/dashboard/tweet-history" />
      )}
    </Parallax>
  );
}