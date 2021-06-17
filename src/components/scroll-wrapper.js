import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ScrollWrapper({ children, propedStyles }) {
  return (
    <ScrollView
      style={propedStyles}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 25,
    paddingBottom: 35,
  },
});
