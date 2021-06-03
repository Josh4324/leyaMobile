import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import Theme, { Box, Text } from '../utils/theme';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function AuthSheet({ router, toggle }) {
  const { width } = useWindowDimensions();

  return (
    <Box style={[styles.container, { width }]}>
      <Text variant="medium" color="black" fontSize={20} marginTop="m">
        Do you have an account with us?
      </Text>

      <Box marginTop="xl">
        <TouchableOpacity style={styles.lightButton}>
          <Text variant="medium" fontSize={16} color="greenPrimary">
            Yes, I am an Existing Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blockButton}
          onPress={() => {
            router('Terms');
            toggle(false);
          }}
        >
          <Text variant="medium" fontSize={16} color="white">
            No, I am a New Member
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    height: moderateScale(290),
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    padding: Theme.spacing.l,
  },
  lightButton: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenOpacity,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.m,
    borderRadius: Theme.borderRadii.m,
    borderColor: '#00A134',
    borderWidth: 1,
    alignItems: 'center',
  },

  blockButton: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.m,
    borderRadius: Theme.borderRadii.m,
    marginTop: Theme.spacing.l,
    alignItems: 'center',
  },
});
