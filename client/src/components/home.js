import React, {Component} from 'react';

class Home extends Component {
  render() {
    return (
      <div id="home-component" class="panel-lg z-depth-5">
        <div id="home-div1">
            <p id="home-header1" style={{fontSize: '24px', fontWeight: 'bold'}}>
              DEVELOPING PRACTICAL SOLUTIONS TO IMPRACTICAL PROBLEMS
            </p>
            <div id="home-inner-div1">
              <p style={{fontSize: '18px'}}>
                Engineers and analysts on our team possess a passion for learning
                and the pursuit of excellence. Fine tuning your extensive needs,
                building trusting relationships, and executing effectively are
                the three drivers for our consulting style.
              </p>
              <br/>
              <p style={{fontSize: '24px', fontWeight: 'bold'}}>
                THE END RESULT?
              </p>
              <p style={{fontSize: '18px'}}>
                A solution that has been delivered with you in mind, but nothing short of performant.
              </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
