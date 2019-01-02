import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Clips from '../Clips/Clips.js';
import API from '../../api/API.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '15px'
    },
});


class CharacterClips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            character: undefined,
            clips: [],
        }
    }

    componentWillMount = () => {
        let characterId = this.props.match.params.characterId;
        if(characterId) {
            API.getCharacter(Number(characterId)).then(response => {
                this.setState({
                    character: response,
                    clips: response.clips ? response.clips : []
                });
            });
        }
    };

    onClickClip = (clip) => {
        console.log("Selected clip",  clip ? clip.id : "Undefined Clip");
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <Clips clips={this.state.clips} onClickClip={this.onClickClip}></Clips>
            </div>
        );
    }

}

CharacterClips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharacterClips);