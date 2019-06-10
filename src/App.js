import React from "react";
import { withStyles } from "@material-ui/core/";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FilmViewComponent from "./FilmView";
import StarshipViewComponent from "./StarshipView";
import CharacterViewComponent from "./CharacterView";
import PlanetViewComponent from "./PlanetView";

import Home from "./Home";
import "./App.css";

const styles = {
  principal: {
    height: "100px"
  }
};

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/films/:id" component={FilmViewComponent} />
      <Route exact path="/planets/:id" component={PlanetViewComponent} />
      <Route exact path="/characters/:id" component={CharacterViewComponent} />
      <Route exact path="/starships/:id" component={StarshipViewComponent} />
    </div>
  </Router>
);

export default withStyles(styles)(App);
