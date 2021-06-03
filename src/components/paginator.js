import React from 'react';
import { StyleSheet, Animated, useWindowDimensions, View } from 'react-native';

import Theme, { Box, Text } from '../utils/theme';

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();
  return (
    <Box flexDirection="row" height={64} padding="xl" justifyContent="center">
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [40, 60, 40],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={styles.dot}
            key={index.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 4,
    backgroundColor: Theme.colors.gold,
    marginRight: 0,
    borderRadius: Theme.borderRadii.s,
  },
});
