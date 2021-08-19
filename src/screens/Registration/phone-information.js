import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RequestVerificationCode } from '../../redux/Authentication/auth-actions';
import SafeWrapper from '../../components/safe-wrapper';
import Button from '../../components/button';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';

const { width: WIDTH } = Dimensions.get('window');

function PhoneInformation({
  navigation,
  RequestVerificationCode,
  errors,
  loading,
}) {
  const { navigate } = navigation;
  const [phoneNumber, setPhoneNumber] = useState('');

  const requestCode = async () => {
    if (phoneNumber.trim().length < 11) {
      return Alert.alert('Alert', 'Phone Number must be 11 numbers.');
    }
    const payload = { username: `234${phoneNumber.replace(/^0+/, '')}` };
    let np = `234${phoneNumber.replace(/^0+/, '')}`;

    await AsyncStorage.setItem('phoneNumber', np);
    RequestVerificationCode(payload, navigate);
  };
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

        <Box
          style={styles.formBox}
          flex={0.7}
          paddingHorizontal="m"
          marginTop="xl"
        >
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              What is your phone number?
            </Text>
            <TextInput
              style={[styles.input]}
              maxLength={11}
              placeholder="Enter your phone number here"
              keyboardType="phone-pad"
              autoFocus={true}
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              autoFocus={true}
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
          marginBottom="m"
        >
          {!loading ? (
            <Button text="Next" action={requestCode} />
          ) : (
            <ActivityIndicator size="small" color="#00A134" />
          )}
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    width: WIDTH - 30,
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
  nextButton: {
    width: WIDTH - 40,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
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

const mapStateToProps = (state) => ({
  errors: state.errors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { RequestVerificationCode })(
  PhoneInformation
);
