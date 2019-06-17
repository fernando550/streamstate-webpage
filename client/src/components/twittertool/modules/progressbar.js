import React, {Component} from 'react';

class ProgressBar extends Component {
  render () {
    return (
      <div class="progress" style={{
        width: '500px',
        display: (this.props.loading ? 'inline-block' : 'none')
      }}>
        <div
          class={(this.props.text === "initializing, please wait..." ? "indeterminate":"determinate")}
          style={{width: this.props.progress}}>
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default ProgressBar;
