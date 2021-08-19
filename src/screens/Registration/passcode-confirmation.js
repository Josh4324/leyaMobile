import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';

import SafeWrapper from '../../components/safe-wrapper';
import Button from '../../components/button';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';
import { RegisterUser } from '../../redux/Authentication/auth-actions';

const { width: WIDTH } = Dimensions.get('window');

function PasscodeConfirmation({ navigation, RegisterUser, errors, loading }) {
  const { navigate } = navigation;
  const [prevCode, setPrevCode] = useState('');
  const [passcode2, setPassCode] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  console.log('int: ', { prevCode, passcode2 });

  useEffect(() => {
    (async () => {
      let passcode = await AsyncStorage.getItem('passcode');
      let fName = await AsyncStorage.getItem('firstName');
      let lName = await AsyncStorage.getItem('lastName');
      let pNumber = await AsyncStorage.getItem('phoneNumber');
      let em = await AsyncStorage.getItem('email');
      console.log(passcode);
      setPrevCode(passcode);
      setFirstName(fName);
      setLastName(lName);
      setPhoneNumber(pNumber);
      setEmail(em);
    })();
  });

  const compareCode = (a, b) => {
    console.log(a, b);
    if (a === b) {
      setIsValid(true);
    } else {
      setIsValid(false);
      return Alert.alert('Error', 'Your Passcodes do not match');
    }
  };

  const showErrorAlert = () => {
    Alert.alert('Error', `${errors?.message}`);
  };

  const onRegister = async () => {
    compareCode();
    let deviceId = uuid.v4();
    await AsyncStorage.setItem('deviceID', deviceId);
    const payload = {
      deviceId: deviceId,
      firstName: firstName,
      mobileNumber: phoneNumber,
      password: prevCode,
      surname: lastName,
      userId: email,
      userPin: prevCode,
      gender: '',
      location: '',
      accountNumber: '',
      bankCode: '',
      dateOfBirth: '',
    };
    console.log(payload);
    RegisterUser(payload, navigate);
  };

  return (
    <SafeWrapper propedStyles={{ backgroundColor: 'white' }}>
      {/* {errors?.message && showErrorAlert()} */}

      <KeyboardWrapper>
        <Box paddingHorizontal="m" flex={0.2}>
          <RegistrationHeader
            activeStep="Final Step"
            activeTitle="Confirm your passcode"
            progress="100%"
          />
        </Box>

        <Box style={styles.formBox} flex={0.7} paddingHorizontal="m">
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              Confirm your passcode
            </Text>

            <OTPInputView
              style={{
                width: '50%',
                height: 50,
                marginTop: Theme.spacing.m,
              }}
              pinCount={6}
              code={passcode2}
              onCodeChanged={(code) => {
                setPassCode(code);
              }}
              autoFocusOnLoad
              secureTextEntry={true}
              placeholderTextColor={Theme.colors.gold}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                compareCode(prevCode, code);
              }}
            />
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
                Ensure your passcode is protected at all times, do not share
                this with anyone.
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
          {isValid ? (
            !loading ? (
              <Box
                flex={0.1}
                paddingHorizontal="m"
                alignItems="center"
                justifyContent="center"
              >
                <TouchableOpacity
                  style={[styles.nextButton]}
                  onPress={() => onRegister()}
                >
                  <Text color="white" variant="medium" fontSize={20}>
                    Next
                  </Text>
                </TouchableOpacity>
              </Box>
            ) : (
              <ActivityIndicator size="small" color="#00A134" />
            )
          ) : null}
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

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { RegisterUser })(PasscodeConfirmation);
