import React, { Component } from "react";
import axios from 'axios';
import Dashboard from "./dashboard";
import LoginForm from "./loginform";

class TwitterTool extends Component {
  state = {
	  username: '',
	  password: '',
	  confirmation: false,
	  error: false
	};

  handleSubmit = async (e) => {
  	e.preventDefault();

		await axios.post('/ttapi/login', this.state)
    .then((result) => {
      var data = result.data;
      console.log("Server data: ", data)
  		this.setState({confirmation: data.confirmation, error: data.error});
    })
    .catch((error) => {
      console.log(error)
    })
  }

  onInputChange = (e) => {
    let {value, name} = e.target;
    this.setState({
      [name]: value
    });
    if (this.state.error) {
      this.setState({
        error: false
      });
    }
  };

  render() {
    return (
      <div>
        {!this.state.confirmation &&
          <LoginForm
            handleSubmit={this.handleSubmit}
            onInputChange={this.onInputChange}
            confirmation={this.state.confirmation}
            error={this.state.error}
            username={this.state.username}
            password={this.state.password}
          />
        }
        {this.state.confirmation &&

          <Dashboard/>
        }
      </div>
    );
  }
}

export default TwitterTool;
