import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

export default function KeyboardWrapper({ children }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={50}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
