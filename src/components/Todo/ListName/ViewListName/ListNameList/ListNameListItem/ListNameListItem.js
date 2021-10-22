import React from 'react';
import classes from './ListNameListItem.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const ListNameListItem = (props) => {
  return (
    <div className={classes.ListNameListItem}>
      <ListItem>
        <ListItemText primary={props.name} />
      </ListItem>
      <div className={classes.ButtonContainer} onClick={props.onDelete}>
        <DeleteOutlineIcon fontSize='large' color='action' />
      </div>
    </div>
  );
};

export default ListNameListItem;
