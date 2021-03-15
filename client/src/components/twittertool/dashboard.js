import React, {Component} from 'react';
import Functions from './functions';

const MenuButton = props => {
    return (
      <div className="col p-0 dash-menu-item">
        <a
          id={props.id}
          className="waves-effect waves-light px-3 text-white"
          onClick={props.handleClick}>
          {props.text}
        </a>
      </div>
    )
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
        text: 'Friends/Followers Download',
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
      <div className="container pb-4 rounded-lg">
        <div className="row">
          {this.state.menuItems.map((item, i) => <MenuButton key={i} id={item.id} text={item.text} handleClick={this.onClick}/>)}
        </div>
        <Functions view={this.state.menuItems}/>
      </div>
    );
  }
}

export default Dashboard;
