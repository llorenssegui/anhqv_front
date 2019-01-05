import React from 'react';
import Clip from './Clip.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
    mouse: {
        cursor: 'pointer'
    }
};

class Clips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clips: [],
        }
    }

    onClickClip = (clip) => {
        this.props.onClickClip(clip);
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={24}>
                {this.props.clips.map(clip => {
                    return(
                    <Grid item md={6} sm={12}>
                        <Clip clip={clip} onClickClip={this.onClickClip} className={classes.mouse}></Clip>
                    </Grid>
                    );
                })}
            </Grid>
        );
    };
}

Clips.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Clips);