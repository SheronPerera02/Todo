import React, { useState, useEffect } from 'react';
import classes from './Todo.css';
import CreateTodo from '../../components/Todo/CreateTodo/CreateTodo';
import ViewTodo from '../../components/Todo/ViewTodos/ViewTodo/ViewTodo';
import ViewDone from '../../components/Todo/ViewTodos/ViewDone/ViewDone';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Drawer from '../../components/Drawer/Drawer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Todo = ({
  error,
  onFetchListNames,
  token,
  userId,
  drawerVisible,
  onHideDrawer,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onFetchListNames(token, userId, onOpenSnackBar);
  }, []);

  const onCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onOpenSnackBar = () => {
    setOpen(true);
  };

  const onHideDrawerHandler = () => {
    onHideDrawer();
  };

  return (
    <div className={classes.Todo}>
      <Route path={'/todoo/'} exact component={ViewTodo} />
      <Route path={'/todoo/done'} exact component={ViewDone} />
      <Route path={'/todoo/create'} component={CreateTodo} />
      <Backdrop show={drawerVisible} onClose={onHideDrawerHandler}></Backdrop>
      <Drawer show={drawerVisible} onClose={onHideDrawerHandler} />
      <Snackbar open={open} autoHideDuration={3000} onClose={onCloseSnackBar}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={onCloseSnackBar}
          severity={error ? 'error' : 'success'}
        >
          {error ? 'Oops! Something went wrong...' : 'Successfully Created!'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.todo.error,
    drawerVisible: state.todo.drawerVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchListNames: (token, userId, openSnackBar) =>
      dispatch(actions.fetchListNames(token, userId, openSnackBar)),
    onHideDrawer: () => dispatch(actions.hideDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
