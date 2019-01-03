import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VideoFrame from '../Video/VideoFrame.js';
import API from '../../api/API';
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
      API.getClip(Number(this.props.match.params.clipId)).then(response => {
        this.setState({clip: response});
        this.setState({characters: response.characters});
        this.setState({videoId: this.getYoutubeVideoId(response.link)});
        let opts = {
            height: '100%',
            width: '60%',
            playerVars: { 
                autoplay: 1,
                start: response.start,
                end: response.end,

            }
        };
        this.setState({opts: opts});
      });
    };

    getYoutubeVideoId = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
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