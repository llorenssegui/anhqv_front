import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Character from './Character.js'

const styles= {};

class Characters extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
            <Grid container spacing={24}>    
                {this.props.characters.map(character => {
                    return(
                        <Grid item md={4} sm={12}>
                            <Character character={character}></Character>
                        </Grid>
                    );
                })}  
            </Grid>
            </div>
        );
    };

}

Characters.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Characters);