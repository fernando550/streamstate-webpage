import React, {Component} from 'react';

class About extends Component {
  render() {
    return (
      <div id="home-component" class="z-depth-5">
          <p class="home-header bold">
            About Us
          </p>
          <p style={{width: '10%', borderBottom: '1px solid black', margin: 'auto'}}></p>
          <div id="home-inner-div1">
            <p>
              StreamState was born from the idea that technology consulting services aren't
              what they used to be. In an industry that is so rigorous, and where pressure is constantly
              applied to push out products and updates, it is crucial to practice good customer relations.
              Technology is so important to us, and we rely on it day-to-day, but knowing the teams behind
              your tech solutions will give you confidence in those products you use.

              Not only that, but in order to rely on customer service, we want our products to handle
              themselves. StreamState is pushing through to the Machine Learning & Artificial Intelligence
              segment of technology to bring self-sustaining products that will learn on your data and
              provide a level of detail not even human analysts could ever provide.

            </p>
            <br/>
            <p class="home-header bold">
              This is a bright future, this is StreamState
            </p>
          </div>
      </div>
    );
  }
}

export default About;
