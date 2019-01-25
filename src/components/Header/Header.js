import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import createHistory from 'history/createBrowserHistory';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
      cursor: 'pointer'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.history = createHistory();
    }

    redirectToHome = () => {
        this.history.push("/");
        location.reload();
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow} onClick={this.redirectToHome}>
                            Aqui No Hay Quien Viva Clips
                        </Typography>
                    </Toolbar>
                </AppBar>
                </Router>
            </div>
        );
    };

}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);