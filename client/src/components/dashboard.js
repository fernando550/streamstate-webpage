import React, {Component} from 'react';
import FileUpload from './fileupload';
import Help from './help';

class Dashboard extends Component {
  state = {
    toolView: true,
    helpView: false
  }

  onClick = (e) => {
    e.preventDefault();

    if (e.target.id === 'toolView') {
      this.setState({
        toolView: true,
        helpView: false
      });
    } else if (e.target.id === 'helpView'){
      this.setState({
        toolView: false,
        helpView: true
      });
    } else {
      window.location.reload();
    }

  }

  render() {
    return (
      <div class="row" id="dashboard-component">
        <div class="col s1" style={{backgroundColor: 'white', height: '100%'}}>
          <div class="row dash-menu-row valign-wrapper">
            <a
              id="toolView"
              class="waves-effect waves-light"
              onClick={this.onClick}>
              <span>TOOL</span>
            </a>
          </div>
          <div class="row dash-menu-row">
            <a
              id="helpView"
              class="waves-effect waves-light"
              onClick={this.onClick}>
              HELP
            </a>
          </div>
          <div class="row dash-menu-row">
            <a
              id="signOut"
              class="waves-effect waves-light"
              onClick={this.onClick}>
              SIGN OUT
            </a>
          </div>
        </div>
        <div class="col s11" style={{height: '100%'}}>
          {this.state.toolView &&
            <FileUpload/>
          }
          {this.state.helpView &&
            <Help/>
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
