import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import {
  RequestVerificationCode,
  VerifyCode,
} from '../../redux/Authentication/auth-actions';

import SafeWrapper from '../../components/safe-wrapper';
import Button from '../../components/button';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';

const { width: WIDTH } = Dimensions.get('window');

function Verification({
  navigation,
  RequestVerificationCode,
  VerifyCode,
  errors,
  loading,
}) {
  const { navigate } = navigation;

  const [OTPCode, setOTPCode] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    (async () => {
      let ph = await AsyncStorage.getItem('phoneNumber');
      setPhone(ph);
    })();
  });

  const onVerify = async () => {
    console.log(phone);
    VerifyCode(OTPCode, phone, navigate);
  };

  const onResend = () => {
    const payload = { username: phone };
    RequestVerificationCode(payload, navigate);
  };

  return (
    <SafeWrapper propedStyles={{ backgroundColor: 'white' }}>
      <KeyboardWrapper>
        <Box paddingHorizontal="m" flex={0.2}>
          <RegistrationHeader
            activeStep="Step 2"
            activeTitle="Verify your account"
            inactiveStep="Step 3"
            inactiveTitle="Create a passcode"
            progress="60%"
          />
        </Box>

        <Box
          style={styles.formBox}
          flex={0.7}
          paddingHorizontal="m"
          marginTop="l"
        >
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              Verification Code
            </Text>

            <OTPInputView
              style={{ width: '100%', height: 80, marginTop: Theme.spacing.m }}
              pinCount={5}
              code={OTPCode}
              onCodeChanged={(code) => {
                setOTPCode(code);
              }}
              autoFocusOnLoad
              placeholderTextColor={Theme.colors.greenPrimary}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginVertical="l"
          >
            <Text variant="body" fontSize={14} color="primaryText">
              Didn’t recieve the code?
            </Text>

            <Box>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => onResend()}
              >
                <Ionicons
                  name="return-up-back-outline"
                  color={Theme.colors.greenPrimary}
                  size={28}
                />
                <Text
                  color="greenPrimary"
                  variant="medium"
                  fontSize={16}
                  marginLeft="s"
                >
                  Resend
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box paddingHorizontal="m" marginTop="xl" style={styles.disclaimer}>
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
                The OTP sent to your phone expires in 05:00 minutes
              </Text>
            </Box>
          </Box>

          <Text color="red">{errors?.message}</Text>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
          marginBottom="m"
        >
          {!loading ? (
            <Button text="Next" action={onVerify} />
          ) : (
            <ActivityIndicator size="small" color="#00A134" />
          )}
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cellView: {
    paddingVertical: 11,
    width: 60,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Theme.borderRadii.s,
    backgroundColor: Theme.colors.inputBG,
    borderColor: 'rgba(218, 218, 218, 0.4)',
  },

  underlineStyleBase: {
    width: 60,
    height: 50,
    borderWidth: 0,
    borderWidth: 1.5,
    borderRadius: Theme.borderRadii.s,
    borderColor: 'rgba(218, 218, 218, 0.4)',
    color: Theme.colors.greenPrimary,
    fontSize: 16,
  },
  underlineStyleHighLighted: {
    borderColor: Theme.colors.gold,
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
});

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  RequestVerificationCode,
  VerifyCode,
})(Verification);
