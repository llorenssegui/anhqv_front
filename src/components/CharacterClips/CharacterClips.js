import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Clips from '../Clips/Clips.js';
import API from '../../api/API.js';
import Grid from '@material-ui/core/Grid';
import CharacterProfile from '../Characters/CharacterProfile.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '15px'
    },
    characterSection: {
        margin: '20px'
    },
});


class CharacterClips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clips: [],
            characterName: undefined,
            characterUrlPicture: undefined
        }
    }

    componentWillMount = () => {
        API.getCharacter(Number(this.props.match.params.characterId)).then(response => {
            this.setState({
                clips: response.clips,
                characterName: response.name,
                characterUrlPicture: response.url_picture
            });
        });
    };

    onClickClip = (clip) => {
        this.props.history.push('/clips/' + clip.id);
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <div className={classes.characterSection}>
                <CharacterProfile 
                    urlPicture={this.state.characterUrlPicture}
                    characterName={this.state.characterName}
                />
            </div>
            <Grid container>
                <Clips clips={this.state.clips} onClickClip={this.onClickClip}></Clips>
            </Grid>
            </div>
        );
    }

}

CharacterClips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharacterClips);