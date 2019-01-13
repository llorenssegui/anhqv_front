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
import MultipleSelect from '../MultipleSelect/MultipleSelect.js';

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
        selectedCharacters: [],
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onTimeChange = (id, time) => {
    debugger;
    this.setState({[id]: time});
    console.log(this.state);
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