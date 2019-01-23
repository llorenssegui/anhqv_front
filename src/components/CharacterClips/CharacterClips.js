import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Clips from '../Clips/Clips.js';
import API from '../../api/API.js';
import Utils from '../../utils/Utils.js';
import Grid from '@material-ui/core/Grid';
import CharacterProfile from '../Characters/CharacterProfile.js';
import LoadingGif from '../LoadingGif/LoadingGif.js';
import Message from '../Message/Message.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '15px'
    },
    characterSection: {
        margin: '20px'
    },
});

const NOT_FOUND_CLIPS_MESSAGE = "Todavía no se han añadido clips a este personaje";
const ADD_CLIP_MESSAGE = "Para añadir un clip pulsa sobre el botón flotante situado en la parte inferior-derecha";

class CharacterClips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clips: [],
            characterName: undefined,
            characterUrlPicture: undefined,
            showLoading: true,
            validatedClips: 0
        }
    }

    componentWillMount = () => {
        API.getCharacter(Number(this.props.match.params.characterId)).then(response => {
            let validatedClips = response.clips.filter(clip => clip.validated === undefined || clip.validated === true);
            this.setState({
                clips: response.clips,
                characterName: response.name,
                characterUrlPicture: response.url_picture,
                showLoading: false,
                validatedClips: validatedClips.length,
            });
            //Utils.updateMetadata(document, response.name, response.url_picture);
        }).catch(() => {
            this.props.history.push("/error");
            return;
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
            <hr/>
            <Grid container>
                <Clips clips={this.state.clips} onClickClip={this.onClickClip}></Clips>
            </Grid>
            <LoadingGif show={this.state.showLoading}></LoadingGif>
            {this.state.validatedClips < 1 &&
                <Message 
                    text={NOT_FOUND_CLIPS_MESSAGE}
                    subText={ADD_CLIP_MESSAGE}
                />
            }
            </div>
        );
    }

}

CharacterClips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharacterClips);