import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';

import SafeWrapper from '../../components/safe-wrapper';
import Button from '../../components/button';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';

const { width: WIDTH } = Dimensions.get('window');

export default function PersonalInformation({ navigation }) {
  const { navigate } = navigation;
  return (
    <SafeWrapper propedStyles={{ backgroundColor: 'white' }}>
      <KeyboardWrapper>
        <Box paddingHorizontal="m" flex={0.2}>
          <RegistrationHeader
            activeStep="Step 1"
            activeTitle="Personal Information"
            inactiveStep="Step 2"
            inactiveTitle="Verify your account"
            progress="25%"
          />
        </Box>

        <Box style={styles.formBox} flex={0.7} paddingHorizontal="m">
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              What is your first name?
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="first name here"
              keyboardType="default"
            />
          </Box>

          <Box style={styles.formGroup} marginTop="xl">
            <Text variant="medium" color="primaryText" fontSize={22}>
              What is your last name?
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="last name here"
              keyboardType="default"
            />
          </Box>

          <Box style={styles.formGroup} marginTop="xl">
            <Text variant="medium" color="primaryText" fontSize={22}>
              And your email address?
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter your email address here"
              keyboardType="email-address"
            />
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
        >
          <Button router={navigate} routeName="PhoneInformation" text="Next" />
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    width: WIDTH - 45,
    height: 50,
    borderRadius: 5,
    borderColor: 'rgba(218, 218, 218, 0.4)',
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: Theme.colors.inputBG,
    color: Theme.colors.primaryText,
    fontFamily: 'GraphikRegular',
    marginTop: 24,
  },
});
