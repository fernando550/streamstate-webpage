import React, {Component} from 'react';
import Functions from './functions';
import Help from './help';

class MenuButton extends Component {
  render() {
    const style = {
      // width: '10%'
    }
    return (
      <div class="col s2 dash-menu-item" style={style}>
        <a
          id={this.props.id}
          class="waves-effect waves-light"
          onClick={this.props.handleClick}>
          {this.props.text}
        </a>
      </div>
    )
  }
}

class Dashboard extends Component {
  state = {
    menuItems: [
      {
        id: 'tweetView',
        text: 'Tweet History',
        view: true
      },
      {
        id: 'fileView',
        text: 'Sphere of Influence (SOI)',
        view: false
      },
      {
        id: 'userView',
        text: 'SOI (Single User)',
        view: false
      },
      {
        id: 'userList',
        text: 'User List Data',
        view: false
      },
      {
        id: 'helpView',
        text: 'Help',
        view: false
      },
      {
        id: 'signOut',
        text: 'Sign Out',
        view: false
      }
    ]
  }

  onClick = (e) => {
    e.preventDefault();

    if (e.target.id === 'signOut'){
      window.location.reload();
    } else {
      const state = this.state.menuItems
      console.log("current state: ", state)
      const mapArray = this.state.menuItems.map((item) => (item.id == e.target.id ? {...item, view: true} : {...item, view: false}))
      this.setState({menuItems: mapArray})
      console.log("new state: ", this.state.menuItems)
    }
  }

  render() {
    return (
      <div class="row" id="dashboard-component">
        <div class="row">
          {this.state.menuItems.map((item, i) => <MenuButton key={i} id={item.id} text={item.text} handleClick={this.onClick}/>)}
        </div>
        <div class="row" style={{width: '80%'}}>
          <Functions view={this.state.menuItems}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
