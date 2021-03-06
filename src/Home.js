import React from "react";
import { withRouter } from "react-router-dom";
import { Typography, withStyles } from "@material-ui/core";
import { getAllFilms } from "./helpers";
import FilmRowComponent from "./FilmRow";

const styles = {
  root: {
    width: "100%"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: []
    };
  }

  componentWillMount() {
    getAllFilms().then(films => this.setState({ films }));
  }

  render() {
    const { classes } = this.props;
    const { films } = this.state;
    console.log(films);
    return (
      <div className={classes.root}>
        <Typography variant="h2"> Películas </Typography>
        {films.map((film, idx) => (
          <FilmRowComponent key={idx} filmInfo={film} />
        ))}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
