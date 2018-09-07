import React, { Component } from "react";
import axios from 'axios';
import Dashboard from "./dashboard";


class ttApp extends Component {
  state = {
	  userName: '',
	  passWord: '',
	  confirmation: false,
	  error: false
	};

  handleSubmit = async (e) => {
  	e.preventDefault();
  	try {
  		let res = await axios.post('/ttapi/login', this.state);
  		let data = res.data;
      console.log("Server data: ", data)
  		this.setState({confirmation: data.confirmation, error: data.error});
  	}
  	catch (err) {
  		console.log(err);
  	}
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
      <div class="panel-lg" id="ttapp-panel">

        {!this.state.confirmation &&
          <div id="ttapp-login">
            <div id="login-warning" class="red" style={{display: (this.state.error ? 'block' : 'none')}}>
              Invalid username or password, please try again
            </div>

            <div id="ttapp-login-box" class="row z-depth-5 center-align">
              <form class="col s12" onSubmit={this.handleSubmit}>
                <div id="login-title" class="row indigo darken-4">
                  Twitter Data-Miner
                </div>
                <div class="row" style={{padding: '20px 40px 0px 40px'}}>
                  <div class="input-field col s12">
                    <input
                      id="username"
                      name="userName"
                      type="text"
                      class="validate"
                      style={{width: '100%'}}
                      value={this.state.userName}
                      onChange={this.onInputChange}
                      />
                    <label for="username" id="usernamelabel" style={{color: 'white'}}>Username:</label>
                  </div>
                  <div class="input-field col s12">
                    <input
                      id="password"
                      name="passWord"
                      type="password"
                      class="validate"
                      style={{width: '100%'}}
                      value={this.state.passWord}
                      onChange={this.onInputChange}
                      />
                    <label for="password" id="passwordlabel" style={{color: 'white'}}>Password:</label>
                  </div>
                </div>
                <br />
                <button
                  class="btn indigo darken-4 waves-effect waves-light"
                  type="submit"
                  name="action">
                  Login
                  <i class="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
        }
        {this.state.confirmation &&
          <Dashboard/>
        }
      </div>
    );
  }
}

export default ttApp;
