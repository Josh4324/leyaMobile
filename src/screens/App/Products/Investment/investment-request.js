import React from 'react';
import { StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Button from '../../../../components/button';
import Theme, { Box, Text } from '../../../../utils/theme';

export default function InvestmentRequest({ navigation }) {
  const { navigate } = navigation;
  return (
    <Box flex={1} backgroundColor="darkGreen">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <Box
        flexDirection="row"
        paddingHorizontal="m"
        flex={0.15}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="white"
        paddingTop="m"
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            color={Theme.colors.greenPrimary}
            size={28}
          />
        </TouchableOpacity>
        <Text variant="medium" fontSize={16}>
          Investment Request
        </Text>

        <TouchableOpacity>
          <Text variant="medium" fontSize={16} color="red">
            Cancel
          </Text>
        </TouchableOpacity>
      </Box>
      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          backgroundColor="darkGreen"
          flex={0.9}
          paddingHorizontal="m"
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="smallHeading" fontSize={46} color="white">
            COMING SOON
          </Text>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({});
