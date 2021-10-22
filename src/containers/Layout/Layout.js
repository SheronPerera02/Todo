import React, { useEffect } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Layout = (props) => {
  useEffect(() => {
    props.onTryAutoLogin();
  }, []);

  let redirect = null;

  if (props.token) {
    redirect = <Redirect to='/' />;
  } else {
    redirect = <Redirect to='/auth' />;
  }

  const onShowDrawerHandler = () => {
    props.onShowDrawer();
  };

  return (
    <Aux>
      {redirect}
      <Navigation onShow={onShowDrawerHandler} username={props.username} />

      {props.children}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin()),
    onShowDrawer: () => dispatch(actions.showDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
