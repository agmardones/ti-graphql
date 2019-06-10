import React from "react";
import { withRouter } from "react-router-dom";
import { getStarshipInfo } from "./helpers";
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
      films: [],
      pilots: [],
      starship: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    getStarshipInfo(this.props.match.params.id).then(result =>
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
    const { films, starship, pilots } = this.state;
    return (
      <div>
        <SearchBar />
        {starship && <Typography variant="h2">{starship.name}</Typography>}
        <Grid direction="row" container spacing={24}>
          {starship && (
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Paper>
                <Grid container direction="column">
                  <div>
                    <Typography>Nombre: {`${starship.name}`}</Typography>
                  </div>
                  <div>
                    <Typography> Modelo: {`${starship.model}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      {" "}
                      Manufacturador: {`${starship.manufacturer}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Costo en créditos: {`${starship.cost_in_credits}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>Largo: {`${starship.length}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Máxima velocidad en atmósfera:{" "}
                      {`${starship.max_atmosphering_speed}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>Crew: {`${starship.crew}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Pasajeros: {`${starship.passengers}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Capacidad de cargo: {`${starship.cargo_capacity}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Consumibes: {`${starship.consumables}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Hyperdrive rating: {`${starship.hyperdrive_rating}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>MGLT: {`${starship.MGLT}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Clase: {`${starship.starship_class}`}
                    </Typography>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          )}
          {starship && films && (
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
          {starship && pilots && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.listRoot}>
                <List
                  subheader={
                    <ListSubheader disableSticky={true} component="div">
                      Pilotos
                    </ListSubheader>
                  }
                >
                  {pilots.map((pilot, idx) => (
                    <ListItem
                      key={idx}
                      button
                      onClick={this.handleClick(pilot.url)}
                    >
                      <ListItemText primary={`${pilot.name}`} />
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
