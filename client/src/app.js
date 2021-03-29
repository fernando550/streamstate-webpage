import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap";
import "./assets/styles/index.scss";
import "./assets/styles/app.css";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

import { Home } from "./views/home";
import { About } from "./views/about";
import { Contact } from "./views/contact";
import { Login } from "./nuurd/views/login";
import { Logout } from "./nuurd/components/logout";

import { PrivateRoute } from "./routes/privateRoute";

import { createStore } from "./store/store.context";
import { Dashboard } from "./views/dashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/dashboard/:view" component={Dashboard} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default createStore(App);
