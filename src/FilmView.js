import React from "react";
import { withRouter } from "react-router-dom";
import { getFilmInfo } from "./helpers";
import {
  Typography,
  withStyles,
  ListItem,
  List,
  ListItemText,
  ListSubheader,
  Paper,
  Grid
} from "@material-ui/core";
import SearchBar from "./SearchBar";
import moment from "moment";

const styles = {
  listRoot: {
    marginTop: 25,
    height: "300px",
    overflow: "scroll",
    paddingBottom: 20
  }
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: null,
      characters: [],
      planets: [],
      starships: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(urlString) {
    return e => {
      this.props.history.push(urlString);
    };
  }

  componentWillMount() {
    getFilmInfo(this.props.match.params.id).then(response => {
      const { film, characters, planets, starships } = response;
      this.setState({ film, characters, planets, starships });
    });
  }

  render() {
    const { classes } = this.props;
    const { film, characters, planets, starships } = this.state;
    const releaseDate = film
      ? moment(film.release_date)
          .locale("es")
          .format("DD[,] MMMM - YYYY")
      : "";
    return (
      <div>
        <SearchBar />
        {film && <Typography variant="h2">{film.title}</Typography>}
        <Grid direction="row" container spacing={24}>
          {film && (
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Paper>
                <Grid container direction="column">
                  <div>
                    <Typography>
                      {" "}
                      Número episodio: {`${film.episode_id}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography> Director: {`${film.director}`}</Typography>
                  </div>
                  <div>
                    <Typography> Productor: {`${film.producer}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Fecha de lanzamiento: {`${releaseDate}`}
                    </Typography>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          )}
          {film && characters && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.listRoot}>
                <List
                  subheader={
                    <ListSubheader disableSticky={true} component="div">
                      Personajes
                    </ListSubheader>
                  }
                >
                  {characters.map((char, idx) => (
                    <ListItem
                      key={idx}
                      button
                      onClick={this.handleClick(char.url)}
                    >
                      <ListItemText primary={`${char.name}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
          {film && planets && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.listRoot}>
                <List
                  subheader={
                    <ListSubheader disableSticky={true} component="div">
                      Planetas
                    </ListSubheader>
                  }
                >
                  {planets.map((planet, idx) => (
                    <ListItem
                      key={idx}
                      button
                      onClick={this.handleClick(planet.url)}
                    >
                      <ListItemText primary={`${planet.name}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
          {film && starships && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.listRoot}>
                <List
                  subheader={
                    <ListSubheader disableSticky={true} component="div">
                      Naves
                    </ListSubheader>
                  }
                >
                  {starships.map((starship, idx) => (
                    <ListItem
                      button
                      onClick={this.handleClick(starship.url)}
                      key={idx}
                    >
                      <ListItemText primary={`${starship.name}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
