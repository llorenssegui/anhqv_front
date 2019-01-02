import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  avatar: {
    margin: 10,
  },
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
            <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    {this.props.clip.title}
                </Typography>
                <Grid container justify="center" alignItems="center">
                {this.props.clip.characters.map(character => {
                    <Grid item xs={12}>
                        <Avatar alt={character.name} src={character.url_picture} className={classes.avatar} />
                    </Grid>
                })}
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