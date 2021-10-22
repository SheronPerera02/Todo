import React from 'react';
import classes from './Navigation.css';
import profileImage from '../../assets/profilePic.jpeg';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const Navigation = (props) => {
  return (
    <header className={classes.Navigation}>
      <h3>toDoo</h3>
      <div className={classes.Container}>
        <p>{props.username}</p>
        <div className={classes.ProfilePicture}>
          <PersonOutlineIcon fontSize='large' color='action' />
        </div>
        <div className={classes.Hamburger}>
          <p onClick={props.onShow}>☰</p>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
