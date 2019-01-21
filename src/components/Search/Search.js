import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Searchbox from '../Searchbox/Searchbox.js';
import Grid from '@material-ui/core/Grid';
import API from '../../api/API.js';
import Clips from '../Clips/Clips.js';
import LoadingGif from '../LoadingGif/LoadingGif.js';
import QueryString from 'query-string';
import Message from '../Message/Message.js';

const styles = theme => ({
    searchboxContainer: {
        margin: theme.spacing.unit + 3,
        width: 350
    }
});

const SEARCH_MESSAGE = "Introduce un criterio de búsqueda";
const CLIPS_NOT_FOUND_MESSAGE = "No se han encontrado clips"

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: undefined,
            clips: [],
            showLoading: false,
            messageText: SEARCH_MESSAGE,
            showMessage: true
        };
    }

    componentWillMount = () => {
        const values = QueryString.parse(this.props.location.search);
        if(values && values.query) {
            this.setState({ query: values.query });
            this.clipsSearchRequest(values.query);
        }
    };

    onSearchboxChange = (search) => {
        if(search !== '') this.setState({query: search});
    };

    onClickSearch = () => {
        this.clipsSearchRequest(this.state.query);
    };

    clipsSearchRequest = (query) => {
        if(query) {
            let url = "/busqueda";
            if(query != '') {
                url += "?query=" + encodeURIComponent(query); 
            }
            this.props.history.push(url);
            this.setState({ showLoading: true });
            API.clipsSearch(query).then(response => {
                this.handleMessageText(response);
                this.setState({ clips: response, showLoading: false });
            });
        } else {

        }
    }

    onClickClip = (clip) => {
        this.props.history.push('/clips/' + clip.id);
    };

    handleMessageText = (clips) => {
        if(!clips || clips.length < 1) {
            this.setState({
                messageText: CLIPS_NOT_FOUND_MESSAGE,
                showMessage: true
            });
        } else {
            this.setState({
                messageText: SEARCH_MESSAGE,
                showMessage: false
            });
        }
    };

    render () {
        const { classes } = this.props;
        return(
            <div>
                <Grid 
                    container 
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                        >
                            <div className={classes.searchboxContainer}>
                                <Searchbox
                                    onChange={this.onSearchboxChange}
                                    onClickSearch={this.onClickSearch}
                                />
                                <LoadingGif show={this.state.showLoading}></LoadingGif>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Clips clips={this.state.clips} onClickClip={this.onClickClip}></Clips>
                {this.state.showMessage &&
                    <Grid 
                    container 
                    className={classes.clipsContainer}>
                    <Message 
                        text={this.state.messageText}
                    />
                    </Grid>
                }
            </div>
        );
    }

}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Search);