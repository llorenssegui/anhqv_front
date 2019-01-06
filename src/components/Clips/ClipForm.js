import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import API from '../../api/API.js';
import TimeClipInput from '../FormatedInputs/TimeClipInput.js';

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

class ClipForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        title: "",
        link: "",
        episodes: [],
        characters: [],
        episode: -1,
        start: "",
        end: "",
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
    this.props.handleClose();
    this.props.submitForm();
  };

  onChangeTimeClipInput = (name, value) => {
    this.setState({
      [name]: value,
    });
    console.log(name, this.state[name]);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
          <form className={classes.container} noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                label="Título Clip"
                value={this.state.title}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="link"
                label="URL Youtube"
                value={this.state.link}
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
                  {this.state.episodes.map(episode => {
                    return(
                    <MenuItem value={episode.id}>{episode.long_title}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TimeClipInput
                required={true} 
                id={'start'} 
                name={'start'}
                label={'Instante de inicio (hh:mm:ss)'}
                value={this.state.start}
                handleChange={this.onChangeTimeClipInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TimeClipInput
                required={true}  
                id={'end'} 
                name={'end'}
                label={'Instante de fin (hh:mm:ss)'}
                value={this.state.end}
                handleChange={this.onChangeTimeClipInput}
              />
            </Grid>
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