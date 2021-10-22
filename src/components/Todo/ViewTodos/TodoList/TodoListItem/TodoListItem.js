import React from 'react';
import classes from './TodoListItem.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const TodoListItem = ({
  task,
  date,
  done,
  listName,
  deleteItem,
  updateItem,
}) => {
  const overRideStyle = {
    justifyContent: 'flex-end',
  };

  return (
    <div className={classes.TodoListItem}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ArrowForwardIosIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={task} secondary={listName + '  | ' + date} />
      </ListItem>
      <div
        className={classes.ButtonContainer}
        style={done ? overRideStyle : null}
      >
        <div onClick={deleteItem}>
          <DeleteOutlineIcon fontSize='large' color='action' />
        </div>
        {!done ? (
          <div onClick={updateItem}>
            <CheckCircleOutlineIcon fontSize='large' color='action' />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TodoListItem;
