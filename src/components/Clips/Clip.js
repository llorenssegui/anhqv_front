import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '1.5%',
  },
  avatar: {
    margin: 10,
  },
  mouse: {
    cursor: 'pointer',
  }
});

class Clip extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickClip = () => {
        this.props.onClickClip(this.props.clip);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mouse}>
            <Paper className={classes.root} elevation={1} onClick={this.onClickClip}>
                <Grid container>
                    <Grid item md={11} sm={12}>
                        <Typography variant="h5" component="h3">
                            {this.props.clip.title}
                        </Typography>
                    </Grid>
                    <Grid item md={1} sm={12}>
                        <IconButton aria-label="Play">
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            </div>
        );
    };
}

Clip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Clip);