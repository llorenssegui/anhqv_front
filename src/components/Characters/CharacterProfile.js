import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    bigAvatar: {
        width: 60,
        height: 60,
    },    
});

class CharacterProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            urlPicture: undefined,
            characterName: undefined
        };
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container spacing={12}>
                <Grid item md={1}>
                    <Avatar src={this.props.urlPicture} className={classes.bigAvatar}/>
                </Grid>
                <Grid item md={11}>
                    <Typography gutterBottom variant="h5" component="h5">
                        {this.props.characterName}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}

CharacterProfile.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CharacterProfile);