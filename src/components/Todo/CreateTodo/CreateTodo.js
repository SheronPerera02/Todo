import React, { useState, useEffect } from 'react';
import classes from './CreateTodo.css';
import Input from '../../UI/Input/Input';
import Button from '@material-ui/core/Button';
import TodoNavigation from '../../Navigation/TodoNavigation/TodoNavigation';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux';
import { onChangeHandler } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { capitalize } from '../../../shared/utility';

const CreateTodo = (props) => {
  const [controls, setControls] = useState({
    task: {
      inputElement: 'input',
      label: 'Task',
      value: '',
      isValid: false,
      dirty: false,
      validation: {
        required: true,
      },
    },
    listName: {
      inputElement: 'select',
      label: 'List Name',
      value: '',
      options: [],
      isValid: false,
      dirty: false,
      validation: {
        required: true,
      },
    },
    date: {
      inputElement: 'datepicker',
      label: 'Date',
      value: new Date(),
      isValid: true,
      dirty: false,
      validation: {},
    },
  });

  const [formValidity, setFormValidity] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const options = [];

    for (let listNameObj of props.listNameList) {
      options.push({
        label: capitalize(listNameObj.listName),
        value: listNameObj.listName,
      });
    }

    setControls((c) => {
      return {
        ...c,
        listName: {
          ...c.listName,
          value: options.length > 0 ? options[0].value : '',
          isValid: options.length > 0 ? true : false,
          options,
        },
      };
    });
  }, [props.listNameList]);

  const onCreateHandler = () => {
    let todo = {};

    for (let key in controls) {
      todo[key] = controls[key].value;
    }

    todo.userId = props.userId;

    props.onCreateTodo(todo, props.token, onOpenSnackBar);

    setFormValidity(false);
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

  let form = <Spinner />;

  if (!props.loading) {
    form = (
      <Aux>
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
        <div className={classes.Submit}>
          <Button
            variant='outlined'
            disabled={!formValidity}
            onClick={onCreateHandler}
          >
            Create
          </Button>
        </div>
      </Aux>
    );
  }

  return (
    <div className={classes.CreateTodo}>
      <TodoNavigation />
      <Snackbar open={open} autoHideDuration={3000} onClose={onCloseSnackBar}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={onCloseSnackBar}
          severity={props.error ? 'error' : 'success'}
        >
          {props.error
            ? 'Oops! Something went wrong...'
            : 'Successfully Created!'}
        </MuiAlert>
      </Snackbar>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    loading: state.todo.loading,
    error: state.todo.error,
    listNameList: state.todo.listNameList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTodo: (todo, token, openSnackBar) =>
      dispatch(actions.createTodo(todo, token, openSnackBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);
