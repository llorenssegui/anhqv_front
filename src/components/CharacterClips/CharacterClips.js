import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Clips from '../Clips/Clips.js';
import API from '../../api/API.js';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: '15px'
    },
});


class CharacterClips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clips: [],
        }
    }

    componentWillMount = () => {
        API.getCharacter(Number(this.props.match.params.characterId)).then(response => {
            this.setState({clips: response.clips});
        });
    };

    onClickClip = (clip) => {
        this.props.history.push('/clips/' + clip.id);
    };

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <Clips clips={this.state.clips} onClickClip={this.onClickClip}></Clips>
            </div>
        );
    }

}

CharacterClips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharacterClips);