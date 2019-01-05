import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    bigAvatar: {
        width: '340px',
        height: '340px',
    },
    rogress: {
        margin: theme.spacing.unit * 2,
    },
});

class LoadingGif extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: "https://66.media.tumblr.com/805244684d900468a149dde6463255b3/tumblr_msqftoTJ3e1qip9yoo2_400.gif",
        };
    }

    render() {
        const classes = this.props;
        return(
            <div className={classes.root}>
                {this.props.show &&
                    <Grid container>
                        <Grid xs={12}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="flex-end"
                            >
                                <Avatar src={this.state.src} style={{marginTop: '10%', width: '340px', height: '340px',}} className={classes.bigAvatar}/>
                            </Grid>
                        </Grid>
                        <Grid xs={12}>
                            <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-end"
                                >
                                <h4>Cargando <CircularProgress className={classes.progress} size={12}/></h4>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }

}

LoadingGif.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(LoadingGif);