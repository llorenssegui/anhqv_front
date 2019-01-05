import React from 'react';
import Grid from '@material-ui/core/Grid';
import Character from './Character.js'

class Characters extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickCharacter = (id) => {
        this.props.onClickCharacter(id);
    };

    render () {
        return (
            <Grid container spacing={24}>    
                {this.props.characters.map(character => {
                    return(
                        <Grid item md={4} sm={12}>
                            <Character character={character} onClickCharacter={this.onClickCharacter}/>
                        </Grid>
                    );
                })}  
            </Grid>
        );
    };

}
  
export default Characters;