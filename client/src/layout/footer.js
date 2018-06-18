import React, {Component} from "react";
// import {Link} from "react-router-dom";

class Header extends Component {
  render() {

    // const fbLink = "https://www.facebook.com/azimutinsurance/";
    // const instaLink = "https://instagram.com/azimutinsurance";
    // const targetTab = "_blank";
    const email = "STREAMSTATECONSULTING@GMAIL.COM"

    return (
      <div id="footer component">
        <div class="filler-div" style={{height: '300px'}}></div>
        <div id="footer-content" class="indigo darken-3 row">
          <div class="footer-box col s12 m12 l4">
              <h4>LOCATION <i class="material-icons">location_on</i></h4>
              <div>MAIN OFFICE</div>
              <div>MIAMI, FL</div>
          </div>
          <div class="footer-box col s12 m12 l4">
              <h4>CONTACT <i class="material-icons"> phonelink</i></h4>
              <div>EMAIL</div>
              <div>{email}</div>
              <br/>
              <div>PHONE</div>
              <div>(786) 344 - 7889</div>
          </div>
          <div class="footer-box col s12 m12 l4">
              <h4>SOCIAL MEDIA <i class="material-icons"> share</i></h4>
              <div>FACEBOOK</div>
              <div><a herf="#">FB LINK (under construction)</a></div>
              <br/>
              <div>INSTAGRAM</div>
              <div><a herf="#">INSTAGRAM (under construction)</a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
