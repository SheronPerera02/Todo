import React from 'react';
import classes from './ListNameList.css';
import List from '@material-ui/core/List';
import ListNameListItem from './ListNameListItem/ListNameListItem';
import { capitalize } from '../../../../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';

const ListNameList = (props) => {
  const onDeleteHandler = (id) => {
    props.onDeleteListName(id, props.token, props.userId, props.onOpenSnackBar);
  };

  return (
    <div className={classes.ListNameList}>
      <List>
        {props.listNameList.map((listNameItem) => {
          return (
            <ListNameListItem
              name={capitalize(listNameItem.listName)}
              key={listNameItem.listNameId}
              onDelete={() => onDeleteHandler(listNameItem.listNameId)}
            />
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteListName: (id, token, userId, openSnackBar) =>
      dispatch(actions.deleteListName(id, token, userId, openSnackBar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNameList);
