import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      },
      input: {
        marginLeft: 8,
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
};

const ENTER_KEY = 13;

class Searchbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.onChange(event.target.value);
    };

    onClickSearch = () => {
        if(this.props.onClickSearch) this.props.onClickSearch();
    };

    keyPress = (event) => {
        if(event.charCode == ENTER_KEY) {
            this.props.onClickSearch();
        }
    };

    render () {
        const { classes } = this.props;
        return(
            <Paper className={classes.root} elevation={1}>
                <InputBase 
                    name="search" 
                    className={classes.input} 
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                    onKeyPress={this.keyPress}
                 />
                <IconButton 
                    className={classes.iconButton} 
                    aria-label="Search" 
                    onClick={this.onClickSearch}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }

}

Searchbox.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Searchbox);