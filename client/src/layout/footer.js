import React, {Component} from "react";
import '../css/footer.css'
// import {Link} from "react-router-dom";

class Header extends Component {
  render() {

    // const fbLink = "https://www.facebook.com/azimutinsurance/";
    // const instaLink = "https://instagram.com/azimutinsurance";
    // const targetTab = "_blank";
    const email = "STREAMSTATECONSULTING@GMAIL.COM"

    return (
      <div>
        <div id="footer-content" class="row">
          <div id="footer-box" class="col s12 m12 l4">
              <h5 class="bold">LOCATION <i class="material-icons">location_on</i></h5>
              <div>MAIN OFFICE</div>
              <div>MIAMI, FL</div>
          </div>
          <div class="footer-box col s12 m12 l4">
              <h5 class="bold">CONTACT <i class="material-icons"> phonelink</i></h5>
              <div>EMAIL</div>
              <div>{email}</div>
              <br/>
              <div>PHONE</div>
              <div>(786) 344 - 7889</div>
          </div>
          <div class="footer-box col s12 m12 l4">
              <h5 class="bold">SOCIAL MEDIA <i class="material-icons"> share</i></h5>
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
