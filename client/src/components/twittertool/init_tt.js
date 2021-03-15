import React, { Component } from "react";
import axios from "axios";

import parallaxIMG from "../../images/multicolor-laptop.jpg";

import Dashboard from "./dashboard";
import { LoginForm } from "./loginform";
import { Parallax, Background } from 'react-parallax';

import { Redirect } from "react-router";

class TwitterTool extends Component {
  state = {
    username: "",
    password: "",
    confirmation: false,
    error: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/ttapi/login", this.state)
      .then((result) => {
        var data = result.data;
        console.log("Server data: ", data);
        this.setState({ confirmation: data.confirmation, error: data.error });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onInputChange = (e) => {
    let { value, name } = e.target;
    this.setState({
      [name]: value,
    });
    if (this.state.error) {
      this.setState({
        error: false,
      });
    }
  };

  render() {
    return (
      <Parallax bgImage={parallaxIMG} strength={200} className="parallax-container d-flex justify-content-center p-20" bgImageStyle={{top: "-20%"}}>

          {!this.state.confirmation && (
              <LoginForm
                handleSubmit={this.handleSubmit}
                onInputChange={this.onInputChange}
                confirmation={this.state.confirmation}
                error={this.state.error}
                username={this.state.username}
                password={this.state.password}
              />
          )}
          {this.state.confirmation && <Dashboard />}
          </Parallax>

    );
  }
}

export default TwitterTool;
