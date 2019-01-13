import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import API from '../../api/API.js';
import TimeClipInputByUnity from '../FormatedInputs/TimeClipInputByUnity.js';
import FormHelperText from '@material-ui/core/FormHelperText';
import MultipleSelect from '../MultipleSelect/MultipleSelect.js';
import Utils from '../../utils/Utils.js';

const styles = theme => ({
  root: {
    margin: '25px',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%'
  },
  selectField: {
    width: '95%'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DEFAULT_FORM_ERROR_MESSAGE = "Error al validar el formulario. Comprueba los todos los campos."

class ClipForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: "",
        link: "",
        episodes: [],
        characters: [],
        selectedCharacters: [],
        episode: -1,
        start: "",
        end: "",
        formErrorMessage: DEFAULT_FORM_ERROR_MESSAGE,
        isFormError: false,
      }
  }

  componentWillMount = () => {
    API.getEpisodes().then(response => {
      this.setState({episodes: response});
    });
    API.getCharacters().then(response => {
      this.setState({characters: response});
    });
  };

  handleSubmit = () => {
    if(this.formIsValid()) {
      let clip = {
        title: this.state.title,
        link: this.state.link,
        start: Number(this.state.start),
        end: Number(this.state.end),
        episode: {
          title: this.state.episodes[this.state.episode].title
        },
        characters: this.state.selectedCharacters
      };
      API.addClip(clip).then(response => {
        console.log(response);
        this.props.handleClose();
      });
    } else {
      this.setState({ isFormError: true });
      console.log("Formulario invalido");
    }
  };

  formIsValid = () => {
    debugger;
    this.setState({formErrorMessage: ""});
    if(!this.state.title || this.state.title === "") {
      return false;
    }
    if(!this.state.link || this.state.link === "" || Utils.getYoutubeVideoId() === false) {
      this.setState({
        formErrorMessage: "La URL introducida no corresponde a una URL de Youtube"
      });
      return false;
    }
    if(!this.state.episode || this.state.link === -1) {
      return false;
    }
    if(!this.state.selectedCharacters || this.state.selectedCharacters.length < 1) {
      return false;
    }
    if(!this.state.start || isNaN(this.state.start)) {
      return false;
    }
    if(!this.state.end || isNaN(this.state.end)) {
      return false;
    }
    if(this.state.start >= this.state.end) {
      let message = this.state.formErrorMessage;
      const errorMessage = "El tiempo de fin ha de ser mayor al tiempo de inicio";
      if(!message || message === "") {
        message = errorMessage;
      } else {
        message += "\n" + errorMessage;
      }
      this.setState({
        formErrorMessage: message
      });
      return false;
    }
    this.setState({formErrorMessage: DEFAULT_FORM_ERROR_MESSAGE});
    return true;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onTimeChange = (id, time) => {
    this.setState({[id]: time});
  };

  onChangeSelect = (selectedIds) => {
    this.setState({selectedCharacters: selectedIds});
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Cerrar">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Añadir Clip
              </Typography>
              <Button color="inherit" onClick={this.handleSubmit}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.container} autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Título Clip"
                value={this.state.title}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="link"
                name="link"
                label="URL Youtube"
                value={this.state.link}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="episode">Capitulo</InputLabel>
                <Select
                  value={this.state.episode}
                  onChange={this.handleChange}
                  className={classes.selectField}
                  inputProps={{
                    name: 'episode',
                    id: 'episode',
                  }}
                >
                  <MenuItem value={-1}>
                    <em>Capitulo</em>
                  </MenuItem>
                  {this.state.episodes.map((episode, index) => {
                    return(
                    <MenuItem value={index}>{episode.long_title}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TimeClipInputByUnity
                id="start"
                label="Tiempo de inicio del video"
                onTimeChange={this.onTimeChange}/>
            </Grid>
            <Grid item xs={12}>
              <TimeClipInputByUnity 
                id="end"
                label="Tiempo de fin del video"
                onTimeChange={this.onTimeChange}/>
            </Grid>
            <Grid item xs={12}>
              <MultipleSelect 
                obj={this.state.characters}
                placeholder={'Personajes'}
                onChangeSelect={this.onChangeSelect}
                />
            </Grid>
            {this.state.isFormError && 
              <FormHelperText>{this.state.formErrorMessage}</FormHelperText>
            }
          </Grid>
          </form>
        </Dialog>
      </div>
    );
  }
}

ClipForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClipForm);