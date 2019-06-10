import React from "react";
import { withRouter } from "react-router-dom";
import { getCharacterInfo } from "./helpers";
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

const styles = {
  listRoot: {
    marginTop: 25,
    height: "300px",
    overflow: "scroll",
    paddingBottom: 20
  }
};

class CharacterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starships: [],
      films: [],
      character: null,
      homeWorld: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    getCharacterInfo(this.props.match.params.id).then(result =>
      this.setState({ ...result })
    );
  }
  handleClick(urlString) {
    return e => {
      this.props.history.push(urlString);
    };
  }

  render() {
    const { classes } = this.props;
    const { films, starships, character, homeWorld } = this.state;
    return (
      <div>
        <SearchBar />
        {character && <Typography variant="h2">{character.name}</Typography>}
        <Grid direction="row" container spacing={24}>
          {character && (
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Paper>
                <Grid container direction="column">
                  <div>
                    <Typography>Nombre: {`${character.name}`}</Typography>
                  </div>
                  <div>
                    <Typography> Altura: {`${character.height}`}</Typography>
                  </div>
                  <div>
                    <Typography> Peso: {`${character.mass}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Color de pelo: {`${character.hair_color}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Color de piel: {`${character.skin_color}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Color de ojos: {`${character.eye_color}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Año nacimiento: {`${character.birth_year}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Género:{" "}
                      {character.gender === "male" ? "Masculino" : "Femenino"}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Planeta de residencia: {`${homeWorld}`}
                    </Typography>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          )}
          {character && films && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.listRoot}>
                <List
                  subheader={
                    <ListSubheader disableSticky={true} component="div">
                      Películas
                    </ListSubheader>
                  }
                >
                  {films.map((film, idx) => (
                    <ListItem
                      key={idx}
                      button
                      onClick={this.handleClick(film.url)}
                    >
                      <ListItemText primary={`${film.name}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
          {character && starships && (
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
                      key={idx}
                      button
                      onClick={this.handleClick(starship.url)}
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

export default withRouter(withStyles(styles)(CharacterView));
