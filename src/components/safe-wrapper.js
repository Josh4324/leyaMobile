import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

export default function SafeWrapper({ children, propedStyles }) {
  return (
    <SafeAreaView style={[styles.wrapper, propedStyles]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

// marginTop: Platform.OS === 'android' && statusBarHeight,
