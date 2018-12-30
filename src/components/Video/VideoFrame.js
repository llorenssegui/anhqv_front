import React from 'react';
import YouTube from 'react-youtube';

class VideoFrame extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            height: '100%',
            width: '100%',
            playerVars: { 
                autoplay: 1,
                start: 810,
                end: 819,

            }
        };
    }

    onReadyVideo = (event) => {
        //event.target.pauseVideo();
    };

    render () {
        return(
            <YouTube
                videoId="BRL_H8uMDCM"
                opts={this.state}
                onReady={this.onReadyVideo}
            />
        );
    }

}

export default VideoFrame;