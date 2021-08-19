import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import validator from 'validator';

import SafeWrapper from '../../components/safe-wrapper';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: WIDTH } = Dimensions.get('window');

export default function PersonalInformation({ navigation }) {
  const { navigate } = navigation;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const sanitizeName = (data) => {
    let nameArr = data.split(' ');
    let firstName = nameArr[0];
    let middleName = nameArr[(nameArr.length - 1) / 2];
    let lastName = nameArr[nameArr.length - 1];
    if (middleName === undefined) {
      return { firstName, lastName };
    } else if (firstName === middleName && firstName === lastName) {
      Alert.alert('Warning', 'Please enter your full name.');
    } else return { firstName, middleName, lastName };
  };

  const onNextClick = async () => {
    if (validator.isEmpty(name.trim())) {
      return Alert.alert('Error', 'Name must not be empty.');
    }
    if (
      !validator.isLength(name.trim(), {
        min: 2,
        max: 50,
      })
    )
      return Alert.alert('Error', 'Name must be between 2 and 50 characters.');
    if (validator.isEmpty(email.trim()))
      return Alert.alert('Error', 'Email must not be empty');
    if (!validator.isEmail(email.trim()))
      return Alert.alert('Error', 'Please enter a valid email address');

    let fn = sanitizeName(name.trim());
    await AsyncStorage.setItem('firstName', fn?.firstName);
    await AsyncStorage.setItem('lastName', fn?.lastName);
    await AsyncStorage.setItem('email', email.toLowerCase());
    if (fn?.middleName === undefined) {
      await AsyncStorage.setItem('middleName', '');
    } else {
      await AsyncStorage.setItem('middleName', fn.middleName);
    }
    console.log(fn);
    navigate('PhoneInformation');
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
            progress="25%"
          />
        </Box>

        <Box
          style={styles.formBox}
          flex={0.7}
          paddingHorizontal="s"
          alignItems="center"
          marginTop="xl"
        >
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              What is your full name?
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="your name here"
              keyboardType="default"
              value={name}
              onChangeText={(name) => setName(name)}
            />
          </Box>

          <Box style={styles.formGroup} marginTop="l">
            <Text variant="medium" color="primaryText" fontSize={22}>
              And your email address?
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter your email address here"
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="s"
          alignItems="center"
          justifyContent="center"
          marginBottom="m"
        >
          <TouchableOpacity
            style={[styles.nextButton]}
            onPress={() => onNextClick()}
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
    width: WIDTH - 30,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});
