import React, { useEffect } from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { connect } from 'react-redux';

const Router = () => {
  return <AuthStack />;
};

export default Router;
