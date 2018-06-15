import React, {Component} from "react";
// import {Link} from "react-router-dom";

class Header extends Component {
  render() {

    // const fbLink = "https://www.facebook.com/azimutinsurance/";
    // const instaLink = "https://instagram.com/azimutinsurance";
    // const targetTab = "_blank";

    return (
      <div id="footer component">
        <div class="filler-div" style={{height: '300px'}}></div>
        <div id="footer-content" class="indigo darken-3 row">

          <div class="footer-box footer-border col s4">
              <h4>LOCATION <i class="material-icons">location_on</i></h4>
              <div>MAIN OFFICE</div>
              <div>10585 NW 43RD TER, MIAMI, FL 33178</div>
          </div>

          <div class="footer-box footer-border col s4">
              <h4>CONTACT <i class="material-icons"> phonelink</i></h4>
              <div>EMAIL</div>
              <div>STREAMSTATECONSULTING@GMAIL.COM</div>
              <br/>
              <div>PHONE</div>
              <div>(786) 344 - 7889</div>
          </div>
          <div class="footer-box footer-border col s4">
              <h4>SOCIAL MEDIA <i class="material-icons"> share</i></h4>
              <div>FACEBOOK</div>
              <div><a herf="#">FB LINK</a></div>
              <br/>
              <div>INSTAGRAM</div>
              <div><a herf="#">INSTAGRAM</a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
