import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Utils from '../../utils/Utils.js';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '95%'
  },
});

class TimeClipInputByUnity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        hour: 0,
        minute: 0,
        second: 0
    };
  }

  handleChange = name => event => {
    if(event.target.value && !isNaN(event.target.value)) {
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        this.setState({
            [name]: Number(event.target.value),
        });
        stateCopy[name] = Number(event.target.value);
        let time = Utils.hoursToSeconds(stateCopy.hour) + Utils.minutesToSeconds(stateCopy.minute) + stateCopy.second;
        this.props.onTimeChange(this.props.id, time);
    } else {
        this.props.onTimeChange(this.props.id, 0);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid container>
            <InputLabel htmlFor="end" className={classes.formControl}>{this.props.label}</InputLabel>
            <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                    <TextField
                    required
                    error={this.props.error === true}
                    id="hour"
                    label="Hora"
                    defaultValue="0"
                    className={classes.textField}
                    onChange={this.handleChange('hour')}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                    <TextField
                    error={this.props.error === true}
                    required
                    id="minute"
                    label="Minuto"
                    defaultValue="0"
                    className={classes.textField}
                    onChange={this.handleChange('minute')}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                    <TextField
                    error={this.props.error === true}
                    required
                    id="second"
                    label="Segundo"
                    defaultValue="0"
                    className={classes.textField}
                    onChange={this.handleChange('second')}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    />
                </FormControl>
            </Grid>
        </Grid>
      </div>
    );
  }
}

TimeClipInputByUnity.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeClipInputByUnity);