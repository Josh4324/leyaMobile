import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import Theme, { Box, Text } from '../utils/theme';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function Button({ router, routeName, propedStyles, text }) {
  return (
    <>
      <TouchableOpacity
        style={[styles.nextButton, propedStyles]}
        onPress={() => router(routeName)}
      >
        <Text color="white" variant="medium" fontSize={20}>
          {text}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});
