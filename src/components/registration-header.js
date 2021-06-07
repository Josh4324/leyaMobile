import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Theme, { Box, Text } from '../utils/theme';

const { width: WIDTH } = Dimensions.get('window');
export default function RegistrationHeader({
  activeStep,
  activeTitle,
  inactiveStep,
  inactiveTitle,
  progress,
}) {
  return (
    <Box display="flex">
      <Box style={styles.header} paddingTop="m">
        <Box flex={0.7} style={styles.active}>
          <Text
            fontSize={12}
            variant="body"
            lineHeight={22}
            color="primaryText"
          >
            {activeStep}
          </Text>
          <Text
            marginVertical="s"
            fontSize={14}
            variant="medium"
            lineHeight={22}
            color="primaryText"
          >
            {activeTitle}
          </Text>
        </Box>

        <Box flex={0.3} style={[styles.inactive]}>
          <Text
            fontSize={12}
            variant="body"
            lineHeight={22}
            style={{ color: 'rgba(0,0,0,.2)' }}
          >
            {inactiveStep}
          </Text>
          <Text
            marginVertical="s"
            fontSize={14}
            variant="body"
            lineHeight={22}
            style={{ color: 'rgba(0,0,0,.2)' }}
          >
            {inactiveTitle}
          </Text>
        </Box>
      </Box>
      <Box style={styles.progressIndicator}>
        <Box style={[styles.progressBarInner, { width: progress }]}></Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH + 40,
  },
  progressIndicator: {
    minHeight: 3,
    backgroundColor: 'rgba(255, 202, 51, 0.1)',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
  },

  progressBarInner: {
    height: 3,
    width: '25%',
    backgroundColor: Theme.colors.gold,
    borderRadius: 10,
  },
});
