import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Landing from "../screens/Landing/landing";
import Terms from "../screens/Terms/terms";
import Onboarding from "../components/onboarding";
import PersonalInformation from "../screens/Registration/personal-information";
import PhoneInformation from "../screens/Registration/phone-information";
import Verification from "../screens/Registration/verification";
import Passcode from "../screens/Registration/passcode";
import PasscodeConfirmation from "../screens/Registration/passcode-confirmation";
import Login from "../screens/Auth/login";
import Credentials from "../screens/Auth/credentials";
import Success from "../components/success";

const Stack = createStackNavigator();

const AuthStack = ({ checker }) => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={checker === "true" ? "Login" : "Landing"}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Credentials" component={Credentials} />
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
