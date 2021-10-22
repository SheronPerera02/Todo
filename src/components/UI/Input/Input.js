import React from 'react';
import classes from './Input.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Input = (props) => {
  let input;

  const valid = (!props.valid && !props.dirty) || props.valid;

  switch (props.inputElement) {
    case 'input':
      input = (
        <TextField
          className={classes.Input}
          label={props.label}
          variant='outlined'
          onChange={props.onChange}
          color={valid ? 'primary' : 'secondary'}
        />
      );
      break;
    case 'select':
      input = (
        <FormControl variant='outlined' className={classes.Input}>
          <InputLabel>{props.label}</InputLabel>
          <Select
            value={props.value}
            onChange={props.onChange}
            label={props.label}
          >
            {props.options.map((option, index) => {
              return (
                <MenuItem value={option.value} key={index}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
      break;

    case 'datepicker':
      input = (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent='space-around'>
            <KeyboardDatePicker
              className={classes.Input}
              margin='normal'
              label={props.label}
              format='MM/dd/yyyy'
              value={props.value}
              onChange={props.onChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              color={valid ? 'primary' : 'secondary'}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      );
      break;
    default:
      input = null;
  }

  return input;
};

export default Input;
