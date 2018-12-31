import React from 'react';
import Clip from './Clip.js';

const styles = {
};

class Clips extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.clips.map(clip => {
                    <Clip clip={clip}></Clip>
                })}
            </div>
        );
    };
}

export default Clips;