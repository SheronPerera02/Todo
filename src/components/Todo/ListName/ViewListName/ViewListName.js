import React, { useState } from 'react';
import classes from './ViewListName.css';
import ListNameList from './ListNameList/ListNameList';
import Spinner from '../../../UI/Spinner/Spinner';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

const ViewListName = (props) => {
  const [open, setOpen] = useState(false);

  const onCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onOpenSnackBar = () => {
    setOpen(true);
  };

  let listNameList = (
    <ListNameList
      listNameList={props.listNameList}
      onOpenSnackBar={onOpenSnackBar}
    />
  );

  if (props.loading) {
    listNameList = <Spinner />;
  }

  return (
    <div className={classes.ViewListName}>
      {listNameList}
      <Snackbar open={open} autoHideDuration={3000} onClose={onCloseSnackBar}>
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={onCloseSnackBar}
          severity={props.error ? 'error' : 'success'}
        >
          {props.error ? 'Oops! Something went wrong...' : 'Success!'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.todo.listNamesLoading,
    listNameList: state.todo.listNameList,
  };
};

export default connect(mapStateToProps)(ViewListName);
