import React from "react";
import {
  TextField,
  withStyles,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  Divider
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getSearchBarInfo, filterData } from "./helpers";
const styles = {
  results: {
    width: "100%"
  },
  button: {
    margin: 24,
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      color: "black"
    }
  }
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingResults: false,
      films: [],
      starships: [],
      planets: [],
      characters: [],
      filteredFilms: null,
      filteredStarships: null,
      filteredPlanets: null,
      filteredCharacters: null
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(urlString) {
    return e => {
      this.props.history.push(urlString);
    };
  }

  componentWillMount() {
    getSearchBarInfo().then(results => this.setState({ ...results }));
  }

  handleEnter(event) {
    if (event.key === "Enter") {
      const value = event.target.value;
      if (value) {
        const filteredCharacters = filterData(this.state.characters, value);
        const filteredPlanets = filterData(this.state.planets, value);
        const filteredStarships = filterData(this.state.starships, value);
        const filteredFilms = filterData(this.state.films, value);
        this.setState({
          showingResults: true,
          filteredCharacters,
          filteredFilms,
          filteredPlanets,
          filteredStarships
        });
      }
    }
  }
  handleClose() {
    this.setState({ showingResults: false });
  }

  render() {
    const { classes } = this.props;
    const {
      showingResults,
      filteredFilms,
      filteredCharacters,
      filteredStarships,
      filteredPlanets,
      films
    } = this.state;
    const isEnabled = Boolean(films.length !== 0);
    return (
      <div className={classes.resul}>
        <TextField
          disabled={!isEnabled}
          onKeyPress={this.handleEnter}
          type="search"
          style={{ marginRight: 30 }}
          placeholder={
            isEnabled ? "Búsqueda" : "Cargando datos para búsqueda..."
          }
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
        {showingResults && films && (
          <Paper>
            <Typography style={{ margin: 10 }}> Resultados </Typography>
            <List
              subheader={
                <ListSubheader disableSticky={true} component="div">
                  Películas
                </ListSubheader>
              }
            >
              {filteredFilms.map((entity, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={this.handleClick(entity.url)}
                >
                  <ListItemText primary={`${entity.name}`} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List
              subheader={
                <ListSubheader disableSticky={true} component="div">
                  Personajes
                </ListSubheader>
              }
            >
              {filteredCharacters.map((entity, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={this.handleClick(entity.url)}
                >
                  <ListItemText primary={`${entity.name}`} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List
              subheader={
                <ListSubheader disableSticky={true} component="div">
                  Naves
                </ListSubheader>
              }
            >
              {filteredStarships.map((entity, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={this.handleClick(entity.url)}
                >
                  <ListItemText primary={`${entity.name}`} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List
              subheader={
                <ListSubheader disableSticky={true} component="div">
                  Planetas
                </ListSubheader>
              }
            >
              {filteredPlanets.map((entity, idx) => (
                <ListItem
                  key={idx}
                  button
                  onClick={this.handleClick(entity.url)}
                >
                  <ListItemText primary={`${entity.name}`} />
                </ListItem>
              ))}
            </List>
            <Button onClick={this.handleClose} className={classes.button}>
              {" "}
              Cerrar{" "}
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(SearchBar));
