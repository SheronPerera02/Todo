import React, { useState } from 'react';
import classes from './CreateListName.css';
import Input from '../../../UI/Input/Input';
import { onChangeHandler } from '../../../../shared/utility';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';

const CreateListName = (props) => {
  const [controls, setControls] = useState({
    listName: {
      inputElement: 'input',
      label: 'List Name',
      value: '',
      isValid: false,
      dirty: false,
      validation: {
        required: true,
      },
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const [open, setOpen] = useState(false);

  const onSaveHandler = () => {
    let listName = {};

    for (let key in controls) {
      listName[key] = controls[key].value;
    }

    listName.userId = props.userId;

    setControls({
      ...controls,
      listName: {
        ...controls.listName,
        value: '',
      },
    });

    props.onSaveListName(listName, props.token, onOpenSnackBar);
  };

  const onCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onOpenSnackBar = () => {
    setOpen(true);
  };

  return (
    <div className={classes.CreateListName}>
      <Snackbar open={open} autoHideDuration={3000} onClose={onCloseSnackBar}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={onCloseSnackBar}
          severity={props.error ? 'error' : 'success'}
        >
          {props.error
            ? 'Oops! Something went wrong...'
            : 'Successfully Saved!'}
        </MuiAlert>
      </Snackbar>
      {Object.keys(controls).map((key) => {
        return (
          <Input
            inputElement={controls[key].inputElement}
            label={controls[key].label}
            value={controls[key].value}
            options={controls[key].options}
            valid={controls[key].isValid}
            dirty={controls[key].dirty}
            onChange={(event) =>
              onChangeHandler(
                key,
                event,
                controls,
                setControls,
                setFormValidity
              )
            }
            key={key}
          />
        );
      })}
      <div className={classes.Save}>
        <Button
          variant='outlined'
          disabled={!formValidity}
          onClick={onSaveHandler}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.todo.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveListName: (listName, token, openSnackBar) =>
      dispatch(actions.saveListName(listName, token, openSnackBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListName);
