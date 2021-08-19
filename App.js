import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import { ThemeProvider } from '@shopify/restyle';
import { Provider } from 'react-redux';
import { LoadAssets, Theme } from './src/utils/index';
import Router from './src/router/router';
import store from './src/redux/store';

import {
  Icon,
  AdaptiveIcon,
  Splash,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Knot,
} from './assets/images';

Sentry.init({
  dsn: 'https://6c647e2b62164c17a396ee21b0fa4822@o947229.ingest.sentry.io/5896504',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

const assets = [
  Icon,
  AdaptiveIcon,
  Splash,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Knot,
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
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <LoadAssets {...{ assets, fonts }}>
          <Router />
        </LoadAssets>
      </ThemeProvider>
    </Provider>
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
