import React, {Component} from 'react';

class ParseMenu extends Component {
  render () {
    return (
      <div id="parse-menu" class="row z-depth-5">
        <h6 class="bold">SAMPLING TYPE</h6>
        <form onChange={this.props.changeSampling}>
          <label style={{marginRight:'5px'}}>
            <input id="reverse" name="group1" type="radio" defaultChecked />
            <span>Reverse Chrono (default)</span>
          </label>
          <label style={{marginRight:'5px'}}>
            <input id="chrono" name="group1" type="radio" />
            <span>Chronological</span>
          </label>
          <label>
            <input id="random" name="group1" type="radio"  />
            <span>Randomized</span>
          </label>
        </form>
        <br/>
        <h6 class="bold">GROUP TYPE</h6>
        <form onChange={this.props.changeParser}>
          <label style={{marginRight:'5px'}}>
            <input id="friends" name="group1" type="radio" defaultChecked />
            <span>Friends</span>
          </label>
          <label style={{marginRight:'5px'}}>
            <input id="followers" name="group1" type="radio" />
            <span>Followers</span>
          </label>
        </form>
      </div>
    )
  }
}

export default ParseMenu;
