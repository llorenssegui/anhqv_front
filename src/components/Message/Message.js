import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
        marginTop: '15%'
    }
};

class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Typography variant={'display1'} gutterBottom style={{textAlign: 'center'}}>
                            {this.props.text}
                        </Typography>
                        <Typography variant={'caption'} gutterBottom style={{textAlign: 'center'}}>
                            {this.props.subText}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Message);