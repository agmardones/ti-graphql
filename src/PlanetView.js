import React from "react";
import { withRouter } from "react-router-dom";
import { getPlanetInfo } from "./helpers";
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

const styles = {
  listRoot: {
    marginTop: 25,
    height: "300px",
    overflow: "scroll",
    paddingBottom: 20
  }
};

class PlanetView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      residents: [],
      films: [],
      planet: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    getPlanetInfo(this.props.match.params.id).then(result =>
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
    const { films, residents, planet } = this.state;
    return (
      <div>
        {planet && <Typography variant="h2">{planet.name}</Typography>}
        <Grid direction="row" container spacing={24}>
          {planet && (
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Paper>
                <Grid container direction="column">
                  <div>
                    <Typography>Nombre: {`${planet.name}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Periodo de rotación: {`${planet.rotation_period}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      Periodo de órbita: {`${planet.orbital_period}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>Diámetro: {`${planet.diameter}`}</Typography>
                  </div>
                  <div>
                    <Typography>Clima: {`${planet.climate}`}</Typography>
                  </div>
                  <div>
                    <Typography>Gravedad: {`${planet.gravity}`}</Typography>
                  </div>
                  <div>
                    <Typography>Terreno: {`${planet.terrain}`}</Typography>
                  </div>
                  <div>
                    <Typography>
                      Agua superficial: {`${planet.surface_water}`}
                    </Typography>
                  </div>
                  <div>
                    <Typography>Población: {`${planet.population}`}</Typography>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          )}
          {planet && residents && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.listRoot}>
                <List
                  subheader={
                    <ListSubheader disableSticky={true} component="div">
                      Residentes
                    </ListSubheader>
                  }
                >
                  {residents.map((resident, idx) => (
                    <ListItem
                      key={idx}
                      button
                      onClick={this.handleClick(resident.url)}
                    >
                      <ListItemText primary={`${resident.name}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
          {planet && films && (
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
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(PlanetView));
