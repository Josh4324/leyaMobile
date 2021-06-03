import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/Landing/landing';
import Terms from '../screens/Terms/terms';
import Onboarding from '../components/onboarding';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Terms" component={Terms} />
    </Stack.Navigator>
  );
};

export default AuthStack;
