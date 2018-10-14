import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import './css/App.css';
import parallaxIMG from './images/white-pattern-abstract.jpg';

import Header from "./layout/header";
import Footer from "./layout/footer";

import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Location from "./components/location";
import ttApp from './components/ttApp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div class="parallax-container">
            <div class="parallax"><img alt-text="src" src={parallaxIMG}/></div>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/location" component={Location} />
            <Route path="/twitter-tool-login" component={ttApp} />
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
