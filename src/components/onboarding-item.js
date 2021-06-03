import React from 'react';
import { StyleSheet, useWindowDimensions, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import Theme, { Box, Text } from '../utils/theme';

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <Box flex={1} style={{ width, justifyContent: 'center' }}>
      <Box
        style={styles.imageBox}
        backgroundColor="greenPrimary"
        paddingHorizontal="s"
      >
        <Image
          source={item.image}
          style={[styles.image, { width: width * 0.92, resizeMode: 'contain' }]}
        />
      </Box>
      <Box style={styles.textBox} paddingHorizontal="m" paddingVertical="l">
        <Text
          variant="title"
          color="black"
          style={{ lineHeight: moderateScale(32) }}
        >
          {item.title}
        </Text>
        <Text
          variant="body"
          marginTop="l"
          fontSize={moderateScale(16)}
          color="secondaryText"
        >
          {item.description}
        </Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    flex: 0.5,
    justifyContent: 'center',
    paddingTop: 100,
  },
  textBox: {
    flex: 0.5,
  },
});
