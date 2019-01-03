import React from 'react';
import Clip from './Clip.js';

const styles = {
};

class Clips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clips: new Array(),
        }
    }

    onClickClip = (clip) => {
        this.props.onClickClip(clip);
    };

    componentWillReceiveProps = (newProps) => {
        for(let i = 0; i < newProps.clips.length; i++) {
            this.state.clips.push(newProps.clips[i]);
        }
        console.log(this.state.clips);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.clips.map(clip => {
                    return(
                    <Clip clip={clip} onClickClip={this.onClickClip}></Clip>
                    );
                })}
            </div>
        );
    };
}

export default Clips;