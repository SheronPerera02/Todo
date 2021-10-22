import React from 'react';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asycComponent from './hoc/asyncComponent';

const asyncTodo = asycComponent(()=>{
  return import('./containers/Todo/Todo');
});

const App = (props) => {
  const authenticated = (
    <Switch>
      <Route path='/todoo' component={asyncTodo} />
      <Redirect to='/todoo' />
    </Switch>
  );

  const unauthenticated = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Redirect to='/auth' />
    </Switch>
  );

  return (
    <Layout>
      <Switch>
        {props.token ? authenticated : null}
        {!props.token ? unauthenticated : null}
      </Switch>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(App);
