import React from 'react';
import { StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import SafeWrapper from '../../../components/safe-wrapper';
import { Ionicons } from '@expo/vector-icons';
import Theme, { Box, Text } from '../../../utils/theme';
import { moderateScale } from 'react-native-size-matters';
import Card from '../../../../assets/images/card.svg';

export default function PortfolioDetails({ navigation }) {
  return (
    <Box flex={1} backgroundColor="inputBG">
      <StatusBar
        backgroundColor={Theme.colors.greenPrimary}
        barStyle="light-content"
      />
      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          flex={0.08}
          alignItems="center"
          borderBottomWidth={1}
          borderBottomColor="inputBG"
          backgroundColor="inputBG"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={28}
            />
          </TouchableOpacity>
          <Text marginLeft="xxxl" variant="medium" fontSize={16}>
            Your Portfolio Details
          </Text>
        </Box>

        <Box backgroundColor="greenOpacity" flex={0.6} paddingHorizontal="m">
          <Box style={styles.details} padding="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Status:</Text>
              <Box
                style={{
                  backgroundColor: '#FEDEDD',
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <Text color="red">Inactive</Text>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop="m"
            >
              <Text>Interest Rate:</Text>
              <Text color="primaryText" variant="title" fontSize={16}>
                0%
              </Text>
            </Box>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop="m"
            >
              <Text>Account officer:</Text>

              <Text color="primaryText" variant="title" fontSize={16}>
                Not Assigned
              </Text>
            </Box>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginTop="m"
            >
              <Text>Start Date:</Text>

              <Text color="primaryText" variant="title" fontSize={16}>
                N/A
              </Text>
            </Box>
          </Box>

          <Box style={styles.intrest} paddingHorizontal="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              flex={1}
            >
              <Text>Interest Rate:</Text>

              <Text color="primaryText" variant="title" fontSize={16}>
                ₦0
              </Text>
            </Box>
          </Box>

          <Box style={styles.intrest} paddingHorizontal="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              flex={1}
            >
              <Text>Capital invested:</Text>

              <Text color="primaryText" variant="title" fontSize={16}>
                ₦0
              </Text>
            </Box>
          </Box>
          <Text marginTop="l" variant="medium" fontSize={18}>
            Payment History
          </Text>
        </Box>
        <Box
          flex={0.3}
          justifyContent="center"
          alignItems="center"
          paddingHorizontal="m"
        >
          <Card width="150" />
          <Text marginTop="s" variant="body" fontSize={18} textAlign="center">
            You can keep track of all your payment histories here.
          </Text>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  details: {
    height: moderateScale(170),
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    borderRadius: 10,
    marginTop: Theme.spacing.l,
    backgroundColor: 'white',
  },
  intrest: {
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    borderRadius: 10,
    marginTop: Theme.spacing.m,
    backgroundColor: 'white',
  },
});
