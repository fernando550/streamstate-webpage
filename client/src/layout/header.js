import React, {Component} from "react";
import sscLogo from '../images/sscLogo.png';
import {Link} from "react-router-dom";
import '../css/header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <a id="ssc-logo-link" href="/">
              <img id="ssc-logo-img" src={sscLogo} alt="ssc-logo"/>
            </a>
            <a id="mobile-menu" data-target="mobile-nav" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down">
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
              <li><Link to="/location">LOCATION</Link></li>
            </ul>
          </div>
        </nav>
        <ul id="mobile-nav" class="sidenav">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/location">LOCATION</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
