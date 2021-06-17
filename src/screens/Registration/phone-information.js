import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../components/safe-wrapper';
import Button from '../../components/button';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';

const { width: WIDTH } = Dimensions.get('window');

export default function PhoneInformation({ navigation }) {
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
            progress="40%"
          />
        </Box>

        <Box style={styles.formBox} flex={0.7} paddingHorizontal="m">
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              What is your phone number?
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter your phone number here"
              keyboardType="phone-pad"
            />
          </Box>

          <Box style={styles.formGroup} marginTop="xxxl">
            <Box paddingHorizontal="m" style={styles.disclaimer}>
              <Box flex={0.7}>
                <Text
                  color="greenPrimary"
                  variant="body"
                  fontSize={13}
                  lineHeight={20}
                >
                  We simply want to ensure no other person will have access to
                  your app.
                </Text>
              </Box>

              <Box
                justifyContent="center"
                alignItems="center"
                style={styles.whyBox}
              >
                <TouchableOpacity>
                  <Text variant="heading" fontSize={12} color="greenPrimary">
                    Why?
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
        >
          <Button router={navigate} routeName="Verification" text="Next" />
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
  disclaimer: {
    flexDirection: 'row',
    minHeight: moderateScale(70),
    borderWidth: 1,
    borderColor: 'rgba(0, 161, 52, 0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Theme.borderRadii.s,
  },
  whyBox: {
    width: 60,
    height: 45,
    backgroundColor: Theme.colors.greenOpacity,
    borderRadius: 5,
  },
});
