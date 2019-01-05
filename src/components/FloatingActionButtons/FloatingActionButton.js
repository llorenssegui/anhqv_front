import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 5,
    right: theme.spacing.unit * 3,
  },
});

class FloatingActionButton extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickButton = () => {
        if(this.props.onClickButton) this.props.onClickButton();
    };

    render () {
        const { classes } = this.props;
        return (
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.onClickButton}>
                <AddIcon />
            </Fab>
        );
    }
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButton);
