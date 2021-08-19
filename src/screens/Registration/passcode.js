import React, { useState } from 'react';
import { StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';

import SafeWrapper from '../../components/safe-wrapper';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';

const { width: WIDTH } = Dimensions.get('window');

export default function Passcode({ navigation }) {
  const { navigate } = navigation;

  const [passcode, setPassCode] = useState('');

  console.log('passcode: ', passcode);

  const onSetPassCode = async () => {
    if (
      !validator.isLength(passcode.trim(), {
        min: 6,
        max: 6,
      })
    ) {
      return Alert.alert('Error', 'Your passcode must be 6 digits');
    } else {
      await AsyncStorage.setItem('passcode', passcode);
      navigate('PasscodeConfirmation');
    }
  };

  return (
    <SafeWrapper propedStyles={{ backgroundColor: 'white' }}>
      <KeyboardWrapper>
        <Box paddingHorizontal="m" flex={0.2}>
          <RegistrationHeader
            activeStep="Step 3"
            activeTitle="Create a Passcode"
            inactiveStep="Step 4"
            inactiveTitle="Confirm passcode"
            progress="80%"
          />
        </Box>

        <Box style={styles.formBox} flex={0.7} paddingHorizontal="m">
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              Create a Passcode
            </Text>

            <OTPInputView
              style={{
                width: '50%',
                height: 50,
                marginTop: Theme.spacing.m,
              }}
              pinCount={6}
              code={passcode}
              onCodeChanged={(code) => {
                setPassCode(code);
              }}
              autoFocusOnLoad
              secureTextEntry={true}
              placeholderTextColor={Theme.colors.gold}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </Box>

          <Box paddingHorizontal="m" marginTop="xxxl" style={styles.disclaimer}>
            <Box alignItems="center" style={styles.whyBox} flex={0.1}>
              <Ionicons
                name="bulb-outline"
                color={Theme.colors.greenPrimary}
                size={32}
              />
            </Box>

            <Box flex={0.9} marginLeft="m">
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
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
        >
          <TouchableOpacity
            style={[styles.nextButton]}
            onPress={() => onSetPassCode()}
          >
            <Text color="white" variant="medium" fontSize={20}>
              Next
            </Text>
          </TouchableOpacity>
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  underlineStyleBase: {
    width: 20,
    height: 20,
    borderWidth: 0,
    borderWidth: 1.5,
    borderRadius: Theme.borderRadii.l,
    borderColor: 'rgba(218, 218, 218, 0.4)',
    color: Theme.colors.greenPrimary,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(218, 218, 218, 0.4)',
  },
  underlineStyleHighLighted: {
    borderColor: Theme.colors.gold,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disclaimer: {
    flexDirection: 'row',
    minHeight: moderateScale(80),
    borderWidth: 1,
    borderColor: 'rgba(0, 161, 52, 0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.colors.greenOpacity,
  },
  nextButton: {
    width: WIDTH - 40,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});
