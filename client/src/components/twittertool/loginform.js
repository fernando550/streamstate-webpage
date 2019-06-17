import React, { Component } from "react";

class LoginForm extends Component {
  render() {

    const labelStyle = {
      color: 'black',
      fontWeight: 'bold'
    }

    const warningStyle = {
      display: (this.props.error ? 'block' : 'none')
    }

    return (
      <div>
        <div id="login-warning" class="red" style={warningStyle}>
          Invalid username or password, please try again
        </div>
        <div id="ttapp-login-box" class="row z-depth-5 center-align">
          <form class="col s12" onSubmit={this.props.handleSubmit}>
            <div id="login-title" class="row">
              Twitter Data-Miner
            </div>
            <div class="row" style={{padding: '20px 40px 0px 40px'}}>
              <div class="input-field col s12">
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="validate"
                  style={{width: '100%'}}
                  value={this.props.username}
                  onChange={this.props.onInputChange}
                  />
                <label for="username" id="usernamelabel" style={labelStyle}>Username:</label>
              </div>
              <div class="input-field col s12">
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="validate"
                  style={{width: '100%'}}
                  value={this.props.password}
                  onChange={this.props.onInputChange}
                  />
                <label for="password" id="passwordlabel" style={labelStyle}>Password:</label>
              </div>
            </div>
            <br />
            <button
              id="tt-login-button"
              class="btn waves-effect waves-light"
              type="submit"
              name="action">
              Login
              <i class="material-icons right">person</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
