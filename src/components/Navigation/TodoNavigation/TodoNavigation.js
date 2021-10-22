import React from 'react';
import classes from './TodoNavigation.css';
import { NavLink } from 'react-router-dom';

const TodoNavigation = () => {
  return (
    <div className={classes.TodoNavigation}>
      <ul>
        <NavLink to='/' className={classes.NavLink}>
          TODOO
        </NavLink>
        |
        <NavLink to='/todoo/done' className={classes.NavLink}>
          DONE
        </NavLink>
        |
        <NavLink to='/todoo/create' className={classes.NavLink}>
          CREATE
        </NavLink>
      </ul>
    </div>
  );
};

export default TodoNavigation;
