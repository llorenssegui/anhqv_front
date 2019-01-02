import React from 'react';
import Clip from './Clip.js';

const styles = {
};

class Clips extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickClip = (clip) => {
        this.props.onClickClip(clip);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.clips.map(clip => {
                    <Clip clip={clip} onClickClip={this.onClickClip}></Clip>
                })}
            </div>
        );
    };
}

export default Clips;