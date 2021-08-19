import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Router = ({ auth }) => {
  const [checker, setChecker] = useState(null);
  useEffect(() => {
    (async () => {
      let ph = await AsyncStorage.getItem('onboarded');
      setChecker(ph);
      console.log(ph);
    })();
  }, [checker]);

  return auth.isAuthenticated ? <AppStack /> : <AuthStack checker={checker} />;
  // return <AuthStack />;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Router);
