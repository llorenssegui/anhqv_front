import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VideoFrame from '../Video/VideoFrame.js';
import API from '../../api/API.js';
import Utils from '../../utils/Utils.js';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
      flexGrow: 1,
      marginTop: '15px',
      marginBottom: '150px',
      marginRight: '15px',
      marginLeft: '15px',
      cursor: 'pointer',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
};

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
            videoLoad: true,
            showVideo: false,
            clipTitle: ''
        };
    }

    componentWillMount = () => {
        let clipId =  this.props.match.params.clipId;
        API.getClip(Number(clipId)).then(response => {
            if(response === undefined || response.start === undefined) {
                this.props.history.push("/error");
                return;
            }
            let opts = {
                height: '500px',
                width: '100%',
                playerVars: { 
                    start: response.start,
                    end: response.end,
                    controls: 0,
                    disablekb: 0,
                    showinfo: 0,
                    fs: 0,
                    cc_load_policy: 0,
                    rel: 0
                }
            };
            this.setState({
                clip: response,
                clipTitle: response.title,
                characters: response.characters || [],
                videoId: Utils.getYoutubeVideoId(response.link),
                opts: opts
            });
            //Utils.updateMetadata(document, response.title, Utils.buildMetaImageFromYoutubeID(Utils.getYoutubeVideoId(response.link)));
        }).catch(() => {
            this.props.history.push("/error");
            return;
        });
    };

    onClickCharacter = (charcter) => {
       this.props.history.push("/personajes/" + charcter.id + "/clips");
    };

    onReadyVideo = () => {
        this.setState({ videoLoad: false, showVideo: true });
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{height: '600px', width: '100%'}}
                >
                    <Typography variant="h5" component="h3">
                    {this.state.clipTitle}
                    </Typography>
                    <VideoFrame 
                        videoId={this.state.videoId} 
                        opts={this.state.opts}
                        onReadyVideo={this.onReadyVideo}
                    />
                </Grid>
                <Grid container justify="center" alignItems="center">
                {this.state.characters.map(character => {
                    return(
                        <Grid item md={1} sm={3} xs={3} onClick={() =>this.onClickCharacter(character)}>
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