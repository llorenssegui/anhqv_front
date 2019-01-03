import React from 'react';
import YouTube from 'react-youtube';

class VideoFrame extends React.Component {

    constructor(props) {
        super(props);
    }

    onReadyVideo = (event) => {
        //event.target.pauseVideo();
    };

    render () {
        return(
            <YouTube
                videoId={this.props.videoId}
                opts={this.props.opts}
                onReady={this.onReadyVideo}
            />
        );
    }

}

export default VideoFrame;