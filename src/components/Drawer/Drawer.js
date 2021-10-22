import React from 'react';
import classes from './Drawer.css';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import CreateListName from '../Todo/ListName/CreateListName/CreateListName';
import ViewListName from '../Todo/ListName/ViewListName/ViewListName';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Drawer = (props) => {
  let attatchedClasses = [classes.Drawer];

  if (props.show) {
    attatchedClasses.push(classes.Open);
  }

  const onLogoutHandler = () => {
    props.onClose();
    props.onLogout();
  };

  return (
    <div className={attatchedClasses.join(' ')}>
      <div className={classes.CloseButtonContainer}>
        <div>
          <CloseIcon
            fontSize='large'
            color='action'
            onClick={props.onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <div>
        <CreateListName />
        <ViewListName />
      </div>
      <div className={classes.LogoutButtonContainer}>
        <div>
          <LockIcon
            fontSize='large'
            color='action'
            style={{ cursor: 'pointer' }}
            onClick={onLogoutHandler}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Drawer);
