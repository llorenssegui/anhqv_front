import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import SearchIcon from '@material-ui/icons/Search';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Search from '../Search/Search.js';
import Body from '../Body/Body.js';

const styles = {
  root: {
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    bottom: 0,
  }
};

class Menu extends React.Component {
  
  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    this.setState({ value });
    if(this.props.onChange) this.props.onChange(this.state.value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Router>
        <div>
        <BottomNavigation
          value={value}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Personajes" 
            icon={<AccessibilityIcon />}
            component={Link}
            to="/personajes"
          />
          <BottomNavigationAction 
            label="Búsqueda" 
            icon={<SearchIcon />}
            component={Link}
            to="/busqueda"
          />
        </BottomNavigation>
        </div>
      </Router>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);