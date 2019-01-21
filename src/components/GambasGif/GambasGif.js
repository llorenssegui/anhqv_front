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
});

class GambasGif extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: "https://66.media.tumblr.com/1b3f09c126d84e7e4d6ca38c12ebc58e/tumblr_p1rvr4hyfR1tpddfio1_400.gif",
        };
    }

    render() {
        const classes = this.props;
        return(
            <div className={classes.root}>
                {this.props.show &&
                    <Grid container>
                        <Grid item xs={12}>
                                <Avatar src={this.state.src} style={{width: '340px', height: '340px',}} className={classes.bigAvatar}/>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }

}

GambasGif.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(GambasGif);