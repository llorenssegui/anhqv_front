import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
            characters: []
        }
    }

    componentWillMount = () => {
        API.getCharacters().then(response => {
            this.setState({characters: response});
        });
    };

    onClickCharacter = (id) => {
        this.props.history.push('/personajes/' + id + '/clips');
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <Characters characters={this.state.characters} onClickCharacter={this.onClickCharacter}></Characters>
            </div>
        );
    }

}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Body);