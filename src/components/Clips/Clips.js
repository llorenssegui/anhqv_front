import React from 'react';
import Clip from './Clip.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {

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
            <Grid container>
                {this.props.clips.map(clip => {
                    if(clip.validated === undefined || clip.validated === true) {
                        return(
                        <Grid item md={6} sm={12} style={{width: '100%'}}>
                            <Clip clip={clip} onClickClip={this.onClickClip} />
                        </Grid>
                        );
                    }
                })}
            </Grid>
        );
    };
}

Clips.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Clips);