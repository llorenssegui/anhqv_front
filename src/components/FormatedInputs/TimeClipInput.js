import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '95%'
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/,/[0-9]/,':',/[0-9]/,/[0-9]/,':',/[0-9]/,/[0-9]/,]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class TimeClipInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        textmask: '00:00:00'
    };
  }

  handleChange = event => {
    this.props.handleChange(this.props.name, event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
          <Input
            required={this.props.required ? true : false}
            value={this.props.value}
            onChange={this.handleChange}
            id={this.props.id}
            inputComponent={TextMaskCustom}
          />
        </FormControl>
      </div>
    );
  }
}

TimeClipInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeClipInput);