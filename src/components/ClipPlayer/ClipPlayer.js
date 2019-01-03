import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VideoFrame from '../Video/VideoFrame.js';
import API from '../../api/API.js';
import Utils from '../../utils/Utils.js';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '15px'
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
});

class ClipPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 0,
            videoId: "",
            clip: undefined,
            characters: [],
            opts: undefined,
        };
    }

    componentWillMount = () => {
        let clipId =  this.props.match.params.clipId;
        API.getClip(Number(clipId)).then(response => {
            let opts = {
                height: '100%',
                width: '60%',
                playerVars: { 
                    autoplay: 1,
                    start: response.start,
                    end: response.end,

                }
            };
            this.setState({
                clip: response,
                characters: response.characters,
                videoId: Utils.getYoutubeVideoId(response.link),
                opts: opts
            });
        });
    };

    onClickCharacter = (charcter) => {
       this.props.history.push("/personajes/" + charcter.id + "/clips");
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <VideoFrame videoId={this.state.videoId} opts={this.state.opts}></VideoFrame>
                <Grid container justify="center" alignItems="center">
                {this.state.characters.map(character => {
                    return(
                        <Grid xs="1" onClick={() =>this.onClickCharacter(character)}>
                            <Avatar alt={character.name} src={character.url_picture} className={classes.bigAvatar} />
                        </Grid> 
                    );
                })}
                </Grid>
            </div>
        );
    }

}

ClipPlayer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ClipPlayer);