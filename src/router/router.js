import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { connect } from 'react-redux';

const Router = ({ auth }) => {
  console.log('auth', auth);
  return auth.isAuthenticated ? <AppStack /> : <AuthStack />;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Router);
