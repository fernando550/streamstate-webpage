import React, {Component} from 'react';

class RadioButton extends Component {
  render() {
    return(
      <label for={this.props.id} style={{marginRight:'5px', color: 'black'}}>
        <input class="with-gap" id={this.props.id} name={this.props.group} type="radio" checked={this.props.checked}/>
        <span>{this.props.text}</span>
      </label>
    )
  }
}

class ParseMenu extends Component {
  render () {
    const colStyle = {
        backgroundColor: "lightgrey",
        borderRadius: '5px',
        padding: '3%',
        minHeight: '150px',
        margin: '0 3px'
      }

    const header = {
      color: 'black',
      fontWeight: '900',
      paddingBottom:'15px'
    }

    return (
      <div id="parse-menu" class="z-depth-5 center-align">
          <h6 style={header}>OPTIONS</h6>
          <div class="row" style={{margin: '0 auto', width: '78%'}}>
          <div class="col s12" style={colStyle}>
          <h6 class="bold">SEARCH TYPE</h6>
          <form onChange={this.props.changeParser}>
            <RadioButton name="group1" id="friends" text="Friends" checked={(this.props.parserType === 'friends' ? true : false)}/>
            <RadioButton name="group1" id="followers" text="Followers" checked={(this.props.parserType === 'friends' ? false : true)}/>
          </form></div>
        </div>
      </div>
    )
  }
}

export default ParseMenu;
