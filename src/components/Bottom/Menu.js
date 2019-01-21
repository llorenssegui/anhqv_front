import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import SearchIcon from '@material-ui/icons/Search';

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

  componentWillMount = () => {
    let menuSection = this.props.menuSection != undefined ? this.props.menuSection : 0;
    this.setState({value: menuSection });
  }

  handleChange = (event, value) => {
    this.setState({ value });
    if(this.props.onChange) this.props.onChange(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div>
        <BottomNavigation
          value={this.props.menuSection}
          showLabels
          className={classes.root}
          onChange={this.handleChange}
        >
          <BottomNavigationAction
            label="Personajes" 
            icon={<AccessibilityIcon />}
          />
          <BottomNavigationAction 
            label="Búsqueda" 
            icon={<SearchIcon />}
          />
        </BottomNavigation>
        </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);