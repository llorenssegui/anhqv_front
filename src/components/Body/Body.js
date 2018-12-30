import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '../Bottom/Menu.js';
import Characters from '../Characters/Characters.js';
import API from '../../api/API.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '15px'
    },
});

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuSection: 0,
            characters: []
        }
    }

    componentWillMount = () => {
        API.getCharacters().then(response => {
            this.setState({characters: response});
        });
    };

    onChangeMenuSection = (value) => {
        this.setState({menuSection: value});
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <Characters characters={this.state.characters}></Characters>
            <Menu onChange={this.onChangeMenuSection}></Menu>
            </div>
        );
    }

}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Body);