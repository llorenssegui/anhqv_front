import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GambasGif from '../GambasGif/GambasGif.js';

const styles = {
    root: {
        flexGrow: 1,
        marginTop: '10%'
    }
};

class NotFound extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <GambasGif show={true} />
                    </Grid>
                    <Grid container justify="center">
                        <Typography variant="display1" gutterBottom>
                            Pàgina no disponible
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(NotFound);