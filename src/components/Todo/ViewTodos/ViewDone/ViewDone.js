import React, { useEffect, useState } from 'react';
import classes from './ViewDone.css';
import TodoNavigation from '../../../Navigation/TodoNavigation/TodoNavigation';
import TodoList from '../TodoList/TodoList';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ViewDone = ({ onFetchTodos, todos, loading, error, token, userId }) => {
  useEffect(() => {
    onFetchTodos(token, userId);
  }, []);

  const [open, setOpen] = useState();

  const onCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onOpenSnackBar = () => {
    setOpen(true);
  };

  const todoArr = todos.filter((todo) => {
    return todo.done;
  });

  let list = (
    <TodoList
      todos={todoArr}
      onOpenSnackBar={onOpenSnackBar}
      token={token}
      userId={userId}
    />
  );

  if (loading) {
    list = <Spinner />;
  }

  return (
    <div className={classes.ViewDone}>
      <TodoNavigation />
      {list}
      <Snackbar open={open} autoHideDuration={3000} onClose={onCloseSnackBar}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={onCloseSnackBar}
          severity={error ? 'error' : 'success'}
        >
          {error ? 'Oops! Something went wrong...' : 'Success!'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    todos: state.todo.todos,
    loading: state.todo.loading,
    error: state.todo.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodos: (token, userId) =>
      dispatch(actions.fetchTodos(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDone);
