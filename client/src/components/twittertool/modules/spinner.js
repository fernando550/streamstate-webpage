import React, {Component} from 'react';

class Spinner extends Component {
  render () {
    return (
      <div
        class="preloader-wrapper small active"
        style={{
        top: '10px',
        marginLeft: '5px',
        display: (this.props.loading === "tweet-parser" ? 'inline-block' : 'none')
      }}>
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Spinner;
