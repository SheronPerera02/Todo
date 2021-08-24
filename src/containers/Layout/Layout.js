import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Aux from '../../hoc/Aux';

const Layout = (props) => {
  return (
    <Aux>
      <Navigation />
      {props.children}
    </Aux>
  );
};

export default Layout;
