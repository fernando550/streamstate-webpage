import React, {Component} from "react";
import sscLogo from '../images/sscLogo.png';
import {Link} from "react-router-dom";

class Header extends Component {
  render() {

    // const fbLink = "https://www.facebook.com/azimutinsurance/";
    // const instaLink = "https://instagram.com/azimutinsurance";
    // const targetTab = "_blank";

    return (
      <nav>
        <div class="nav-wrapper white">
          <a href="/"><img src={sscLogo} style={{marginTop: '10px', width: '200px'}}/></a>
          <ul id="nav-mobile" class="right">
            <li class="indigo darken-3"><Link to="/about">About Us</Link></li>
            <li class="indigo darken-3"><Link to="/contact">Contact Us</Link></li>
            <li class="indigo darken-3"><Link to="/location">Location</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
