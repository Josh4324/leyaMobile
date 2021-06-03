import React from 'react';
import { StatusBar, SafeAreaView, Platform } from 'react-native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

export default function SafeWrapper({ children }) {
  return (
    <SafeAreaView
      style={{
        // marginTop: Platform.OS === 'android' && statusBarHeight,
        flex: 1,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
