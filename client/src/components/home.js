import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
      <div id="home-component" class="panel-lg z-depth-5">
        <div class="home-div1">
            <div>
                <p style={{fontSize: '24px'}}>Developing practical solutions to impractical problems</p>
                <p style={{fontSize: '16px'}}>
                    Engineers and analysts on our team possess a passion for learning
                    and the pursuit of excellence. Fine tuning your extensive needs,
                    building trusting relationships, and executing effectively are
                    the three drivers for our consulting style.</p>
                <br/>
                <p style={{fontSize: '24px'}}>
                    The end result?</p>
                <p style={{fontSize: '16px'}}>
                    A solution that has been delivered with you in mind, but nothing short of performant.</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
