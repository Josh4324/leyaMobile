import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { Provider } from 'react-redux';
import { LoadAssets, Theme } from './src/utils/index';
import Router from './src/router/router';

import {
  Icon,
  AdaptiveIcon,
  Splash,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Knot,
  Ripple,
  Success,
} from './assets/images';

const assets = [
  Icon,
  AdaptiveIcon,
  Splash,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Knot,
  Ripple,
  Success,
];

const fonts = {
  GraphikBlack: require('./assets/fonts/GraphikBlack.otf'),
  GraphikBold: require('./assets/fonts/GraphikBold.otf'),
  GraphikSemiBold: require('./assets/fonts/GraphikSemibold.otf'),
  GraphikMedium: require('./assets/fonts/GraphikMedium.otf'),
  GraphikRegular: require('./assets/fonts/GraphikRegular.otf'),
};
export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <LoadAssets {...{ assets, fonts }}>
        <Router />
      </LoadAssets>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
