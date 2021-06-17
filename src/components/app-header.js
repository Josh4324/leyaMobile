import React from 'react';
import { TouchableOpacity } from 'react-native';
import Bell from '../../assets/images/bell.svg';
import User from '../../assets/images/user.svg';
import { Box, Text } from '../utils/theme';

export default function AppHeader() {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="m"
      paddingTop="m"
    >
      <Box>
        <Text color="white" variant="medium" fontSize={20} lineHeight={24}>
          Hi, Olutoye
        </Text>
      </Box>

      <Box flexDirection="row">
        <TouchableOpacity>
          <User style={{ marginRight: 16 }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Bell width="28" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
