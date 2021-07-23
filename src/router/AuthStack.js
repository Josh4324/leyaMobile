import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/Landing/landing';
import Terms from '../screens/Terms/terms';
import Onboarding from '../components/onboarding';
import PersonalInformation from '../screens/Registration/personal-information';
import PhoneInformation from '../screens/Registration/phone-information';
import Verification from '../screens/Registration/verification';
import Passcode from '../screens/Registration/passcode';
import PasscodeConfirmation from '../screens/Registration/passcode-confirmation';
import Success from '../components/success';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen name="PhoneInformation" component={PhoneInformation} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="Passcode" component={Passcode} />
      <Stack.Screen
        name="PasscodeConfirmation"
        component={PasscodeConfirmation}
      />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default AuthStack;