import React from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles,
  Button
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  root: {
    width: "100%"
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    color: "#999999"
  },
  flexContainer: {
    flexDirection: "column"
  },
  paragraph: {
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    width: "10%",
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      color: "black"
    },
    marginTop: "20px"
  }
};
class FilmRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { filmInfo } = this.props;
    const { url } = filmInfo;
    this.props.history.push(url);
  }

  render() {
    const { filmInfo, classes } = this.props;
    const {
      title,
      episodeId,
      director,
      producers,
      releaseDate,
      openingCrawl
    } = filmInfo;
    const producersString = producers.reduce(
      (prev, actual) => prev + `${actual}, `,
      ""
    );
    const releaseYear = releaseDate.split("-")[0];
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
          <Typography className={classes.secondaryHeading}>
            {`Año de lanzamiento: ${releaseYear}`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.flexContainer}>
          <div className={classes.paragraph}>Episodio: {episodeId}</div>
          <div className={classes.paragraph}>Director: {director} </div>
          <div className={classes.paragraph}>Productor: {producersString} </div>
          <div className={classes.paragraph}>Reseña:</div>
          <div>
            <Typography>{openingCrawl}</Typography>
          </div>
          <Button className={classes.button} onClick={this.handleClick}>
            Ver más
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withRouter(withStyles(styles)(FilmRow));
