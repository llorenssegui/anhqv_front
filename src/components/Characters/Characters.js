import React from 'react';
import Grid from '@material-ui/core/Grid';
import Character from './Character.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        margin: '5px',
    }
  });

class Characters extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickCharacter = (id) => {
        this.props.onClickCharacter(id);
    };

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>    
                    {this.props.characters.map(character => {
                        return(
                            <Grid item md={4} sm={6} xs={12}>
                                <Character character={character} onClickCharacter={this.onClickCharacter}/>
                            </Grid>
                        );
                    })}  
                </Grid>
            </div>
        );
    };

}
  
export default withStyles(styles)(Characters);