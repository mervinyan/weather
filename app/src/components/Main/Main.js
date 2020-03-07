import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Weather from "../Weather/Weather";
import Gallery from "../Gallery/Gallery";
import NotFound from "../NotFound/NotFound";

import "./style.css";

const Main = () => {
  return (
    <main className="main-content">
      <Switch>
        <Redirect exact from="/" to="/weather" />
        <Route exact path="/weather" component={Weather} />
        <Route exact path="/gallery" component={Gallery} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Main;
