import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
  root: {
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    bottom: 0
  }
};

class Menu extends React.Component {
  
    state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    if(this.props.onChange) this.props.onChange(this.state.value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Personajes" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Búsqueda" icon={<FavoriteIcon />} />
      </BottomNavigation>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);