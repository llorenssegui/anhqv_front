import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Characters from '../Characters/Characters.js';
import LoadingGif from '../LoadingGif/LoadingGif.js';
import Grid from '@material-ui/core/Grid';
import Searchbox from '../Searchbox/Searchbox.js';
import API from '../../api/API.js';
import Utils from '../../utils/Utils.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: '15px',
      marginBottom: '150px',
      marginRight: '15px',
      marginLeft: '15px',
    },
    searchBoxContainer: {
        marginBottom: '12px',
    }
});

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            showLoading: true,
            findCharacters: [],
        }
    }

    componentWillMount = () => {
        API.getCharacters().then(response => {
            this.setState({characters: response, findCharacters: response, showLoading: false});
        });
    };

    onClickCharacter = (id) => {
        this.props.history.push('/personajes/' + id + '/clips');
    };

    onSearchboxChange = (search) => {
        let filters = this.state.characters;
        if(search && search != "" && this.state.characters) {
            filters = this.state.characters.filter(character => Utils.removeAccents(character.name).toLowerCase().indexOf(Utils.removeAccents(search.toLowerCase())) !== -1);
            
        }
        this.setState({findCharacters: filters});
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            {this.state.showLoading === false &&
            <Grid 
                container
                className={classes.searchBoxContainer}
            >
                <Grid item xs={12}>
                <   Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-end"
                    >
                    <Searchbox
                        onChange={this.onSearchboxChange}
                        placeholder={'Buscar personaje'}
                    />
                    </Grid>
                </Grid>
            </Grid>
            }
            <Characters characters={this.state.findCharacters} onClickCharacter={this.onClickCharacter}></Characters>
            <LoadingGif show={this.state.showLoading}></LoadingGif>
            </div>
        );
    }

}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Body);