import React from 'react';
import Theme, { Box, Text } from '../utils/theme';
import Phone from '../../assets/images/phone.svg';

export default function EmptyState() {
  return (
    <Box flex={0.5}>
      <Box
        padding="m"
        flex={0.1}
        backgroundColor="white"
        justifyContent="center"
      >
        <Text variant="medium" fontSize={18}>
          Activities
        </Text>
      </Box>

      <Box
        flex={0.9}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: '#FBFBFB' }}
      >
        <Phone width="200" />
        <Text marginTop="l" variant="body" fontSize={18} textAlign="center">
          You can keep track of all your activities here.
        </Text>
      </Box>
    </Box>
  );
}
