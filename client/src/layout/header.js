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
            <a id="ssc-logo-link" href="/"><img id="ssc-logo-img" src={sscLogo} alt="ssc-logo"/></a>
            <a id="mobile-menu" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li class="indigo darken-4"><Link to="/">HOME</Link></li>
              <li class="indigo darken-4"><Link to="/about">ABOUT</Link></li>
              <li class="indigo darken-4"><Link to="/contact">CONTACT</Link></li>
              <li class="indigo darken-4"><Link to="/location">LOCATION</Link></li>
            </ul>
          </div>
        </nav>
        <ul id="mobile-nav" class="sidenav">
          <li class="indigo darken-4"><Link to="/">HOME</Link></li>
          <li class="indigo darken-4"><Link to="/about">ABOUT</Link></li>
          <li class="indigo darken-4"><Link to="/contact">CONTACT</Link></li>
          <li class="indigo darken-4"><Link to="/location">LOCATION</Link></li>
        </ul>
        <div class="filler-div"></div>
      </div>
    );
  }
}

export default Header;
