import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class MultipleSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      selectedObjects: [],
    };
  }

  handleChange = event => {
    let newName = this.state.name;
    newName.push(this.props);
    let selectedObjects = [];
    for(let i = 0; i < event.target.value.length; i++) {
      let o = this.props.obj[event.target.value[i]];
      selectedObjects.push(o);
    }
    this.setState({ 
      name: event.target.value,
      selectedObjects: selectedObjects,
    });
    this.props.onChangeSelect(this.state.selectedObjects);
  };

  joinStringArray = (array) => {
    let str = "";
    if(array) {
      for(let i = 0; i < array.length; i++) {
        let find = this.props.obj[array[i]];
        if(find) str += find.name; + ', '
      }
    }
    debugger;
    return str;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classNames(classes.formControl, classes.noLabel)}>
          <Select
            multiple
            displayEmpty
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-placeholder" />}
            renderValue={selected => {
              if (selected.length === 0) {
                return <em>{this.props.placeholder}</em>;
              }

              return this.joinStringArray(selected);
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>{this.props.placeholder}</em>
            </MenuItem>
            {this.props.obj.map((o, index) => (
              <MenuItem key={index} value={index} style={getStyles(o.name, this)}>
                {o.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);