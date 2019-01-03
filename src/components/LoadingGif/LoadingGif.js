import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margiTop: '-50px',
        marginLeft: '-50px',
        width: '100px',
        height: '100px'
    }
};

class LoadingGif extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: "https://66.media.tumblr.com/805244684d900468a149dde6463255b3/tumblr_msqftoTJ3e1qip9yoo2_400.gif",
        };
    }

    render() {
        const classes = this.props;
        return(
            <div className={classes.root}>
                {this.props.show &&
                    <div>
                        <img src={this.state.src}></img>
                        <h4>Cargando...</h4>
                    </div>
                }
            </div>
        );
    }

}

LoadingGif.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(LoadingGif);