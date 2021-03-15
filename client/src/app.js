import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./styles/app.css";
import 'bootstrap';
import "./styles/index.scss";

import { Navbar } from "./layout/navbar";
import { Footer } from "./layout/footer";

import { Jumbotron } from "./components/jumbotron";
import { Home } from "./components/home";
import { About } from "./components/about";
import { Contact } from "./components/contact";
// import {Location} from "./components/location";
import TwitterTool from "./components/twittertool/init_tt";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        {/* <Route path="/location" component={Location} /> */}
        <Route path="/login" component={TwitterTool} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
