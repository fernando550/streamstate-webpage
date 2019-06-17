import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import './css/App.css';
import parallaxIMG from './images/white-pattern-abstract.jpg';

import Header from "./layout/header";
import Footer from "./layout/footer";

import Home from "./components/init_";
import About from "./components/about";
import Contact from "./components/contact";
import Location from "./components/location";
import TwitterTool from './components/twittertool/init_tt';

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
            <Route path="/twitter-tool-login" component={TwitterTool} />
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
