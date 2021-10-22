import React from 'react';
import classes from './TodoList.css';
import List from '@material-ui/core/List';
import TodoListItem from './TodoListItem/TodoListItem';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TodoList = (props) => {
  const onDeleteItem = (id) => {
    props.onDeleteTodo(id, props.token, props.userId, props.onOpenSnackBar);
  };

  const onUpdateItem = (id) => {
    props.onUpdateTodo(id, props.token, props.userId, props.onOpenSnackBar);
  };

  return (
    <div className={classes.TodoList}>
      <List>
        {props.todos.map((todo) => {
          //'Jan 9, 2014'
          const date = new Date();
          const stringDate =
            months[date.getMonth()] +
            ' ' +
            date.getDate() +
            ', ' +
            date.getFullYear();

          return (
            <TodoListItem
              key={todo.todoId}
              deleteItem={() => onDeleteItem(todo.todoId)}
              updateItem={() => onUpdateItem(todo.todoId)}
              date={stringDate}
              task={todo.task}
              done={todo.done}
              listName={todo.listName}
            />
          );
        })}
      </List>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTodo: (id, token, userId, openSnackBar) =>
      dispatch(actions.deleteTodo(id, token, userId, openSnackBar)),
    onUpdateTodo: (id, token, userId, openSnackBar) => {
      dispatch(actions.updateTodo(id, token, userId, openSnackBar));
    },
  };
};

export default connect(null, mapDispatchToProps)(TodoList);
