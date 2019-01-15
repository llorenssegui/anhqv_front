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
import InputAdornment from '@material-ui/core/InputAdornment';
import YoutubeIcon from '../../icons/YoutubeIcon.js';
import TitleIcon from '../../icons/TitleIcon.js';

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

const DEFAULT_FORM_ERROR_MESSAGE = "Error al validar el formulario. Comprueba todos los campos.";
let defaultState = {
  title: "",
  link: "",
  episodes: [],
  characters: [],
  selectedCharacters: [],
  episode: -1,
  start: 0,
  end: 0,
  formErrorMessage: DEFAULT_FORM_ERROR_MESSAGE,
  isFormError: false,
  isFormSucces: false
};

class ClipForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = defaultState;
      this.buildErrorForm();
  }

  componentWillMount = () => {
    API.getEpisodes().then(response => {
      this.setState({episodes: response});
    });
    API.getCharacters().then(response => {
      this.setState({characters: response});
    });
  };

  buildErrorForm = () => {
    let errorForm = {};
    for(var el in this.state) {
      errorForm[el] = false;
    }
    this.state.errorForm = {};
    this.setState({ 
      errorForm: errorForm,
      isFormError: false 
    });
  };

  handleSubmit = () => {
    if(this.isFormValid()) {
      let characterIds = [];
      this.state.selectedCharacters.forEach(character => characterIds.push(character.id));
      let clip = {
        title: this.state.title,
        link: this.state.link,
        start: Number(this.state.start),
        end: Number(this.state.end),
        episode: Number(this.state.episodes[this.state.episode].id),
        characters: characterIds
      };
      API.addClip(clip).then(response => {
        this.setState({ isFormSucces: false });
        this.clearForm();
        this.handleClose();
      });
    } else {
      this.setState({ isFormError: true });
    }
  };

  handleClose = () => {
    this.buildErrorForm();
    this.props.handleClose();
  };

  isFormValid = () => {
    let valid = true;
    this.setState({formErrorMessage: ""});
    if(!this.state.title || this.state.title === "") {
      this.state.errorForm.title = true;
      valid = false;
    }
    if(!this.state.link || this.state.link === "" || Utils.getYoutubeVideoId(this.state.link) === false) {
      this.setState({
        formErrorMessage: "La URL introducida no corresponde a una URL de Youtube"
      });
      this.state.errorForm.link = true;
      valid = false;
    }
    if(this.state.episode === undefined || this.state.episode === null || this.state.episode === -1) {
      this.state.errorForm.episode = true;
      valid = false;
    }
    if(!this.state.selectedCharacters || this.state.selectedCharacters.length < 1) {
      this.state.errorForm.selectedCharacters = true;
      valid = false;
    }
    if(this.state.start === undefined || this.state.start === null || isNaN(this.state.start)) {
      this.state.errorForm.start = true;
      valid = false;
    }
    if(this.state.end === undefined || this.state.end === null || isNaN(this.state.end)) {
      this.state.errorForm.end = true;
      valid = false;
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
      this.state.errorForm.end = true;
      this.state.errorForm.start = true;
      valid = false;
    }
    if(valid) this.setState({formErrorMessage: DEFAULT_FORM_ERROR_MESSAGE});
    return valid;
  };

  clearForm = () => {
    this.setState(defaultState);
    this.buildErrorForm();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onTimeChange = (id, time) => {
    this.setState({[id]: time});
  };

  onChangeSelect = (characters) => {
    this.setState({selectedCharacters: characters});
  };

  onCloseSnackbar = () => {
    this.setState({ isFormSucces: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Cerrar">
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
                error={this.state.errorForm.title}
                required
                id="title"
                name="title"
                label="Título Clip"
                value={this.state.title}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={this.state.errorForm.link}
                required
                id="link"
                name="link"
                label="URL Youtube"
                value={this.state.link}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YoutubeIcon />
                    </InputAdornment>
                  ),
                }}
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
                error={this.state.errorForm.start}
                id="start"
                label="Tiempo de inicio del video"
                onTimeChange={this.onTimeChange}/>
            </Grid>
            <Grid item xs={12}>
              <TimeClipInputByUnity
                error={this.state.errorForm.end}
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