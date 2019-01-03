import React from 'react';
import Clip from './Clip.js';

const styles = {
};

class Clips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clips: [],
        }
    }

    onClickClip = (clip) => {
        this.props.onClickClip(clip);
    };

    render() {
        return (
            <div>
                {this.props.clips.map(clip => {
                    return(
                    <Clip clip={clip} onClickClip={this.onClickClip}></Clip>
                    );
                })}
            </div>
        );
    };
}

export default Clips;