import React, {Component} from "react";
import sscLogo from '../images/sscLogo.png';
import {Link} from "react-router-dom";

class Header extends Component {
  render() {

    // const fbLink = "https://www.facebook.com/azimutinsurance/";
    // const instaLink = "https://instagram.com/azimutinsurance";
    // const targetTab = "_blank";

    return (
      <div id="header-component">
        <nav>
          <div class="nav-wrapper white">
            <a id="ssc-logo-link" href="/"><img id="ssc-logo-img" src={sscLogo}/></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li class="indigo darken-3"><Link to="/">Home</Link></li>
              <li class="indigo darken-3"><Link to="/about">About Us</Link></li>
              <li class="indigo darken-3"><Link to="/contact">Contact Us</Link></li>
              <li class="indigo darken-3"><Link to="/location">Location</Link></li>
            </ul>
          </div>
        </nav>
        <div class="filler-div"></div>
      </div>
    );
  }
}

export default Header;
