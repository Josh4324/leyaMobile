import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import validator from 'validator';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { connect } from 'react-redux';
import { LoginUser } from '../../redux/Authentication/auth-actions';

import SafeWrapper from '../../components/safe-wrapper';
import KeyboardWrapper from '../../components/safe-wrapper';
import Theme, { Box, Text } from '../../utils/theme';
import Logo from '../../../assets/images/logo.png';
import Leaf from '../../../assets/images/leaf.svg';

const { width: WIDTH } = Dimensions.get('window');

function Credentials({ errors, LoginUser, loading }) {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [icon, setIcon] = useState('eye-outline');
  const [isPassword, setIsPassword] = useState(true);

  const changeIcon = () => {
    icon === 'eye-outline'
      ? setIcon('eye-off-outline')
      : setIcon('eye-outline');
    setIsPassword(!isPassword);
  };

  const onValidate = () => {
    if (validator.isEmpty(email.trim()))
      return Alert.alert('Error', 'Email cannot not be empty');
    if (!validator.isEmail(email.trim()))
      return Alert.alert('Error', 'Please enter a valid email address');
    if (validator.isEmpty(passcode.trim()))
      return Alert.alert('Error', 'Passcode cannot not be empty');
    if (
      !validator.isLength(passcode.trim(), {
        min: 6,
        max: 6,
      })
    )
      return Alert.alert('Error', 'Passcode must be 6 digits');

    const payload = { userId: email.toLowerCase().trim(), password: passcode };

    LoginUser(payload);
  };

  return (
    <SafeWrapper propedStyles={{ backgroundColor: Theme.colors.greenOpacity }}>
      <KeyboardWrapper>
        <Leaf
          width={width}
          style={{
            position: 'absolute',
            resizeMode: 'cover',
          }}
        />
        <Box flex={0.4}>
          <Box style={[styles.imageBox]}>
            <Image
              source={Logo}
              style={{
                width: width * 0.14,
                height: height / 9,
                resizeMode: 'contain',
              }}
            />
            <Text
              variant="medium"
              color="black"
              marginTop="m"
              fontSize={24}
              textAlign="center"
            >
              Welcome Back
            </Text>
            <Text
              variant="body"
              color="black"
              marginTop="s"
              fontSize={16}
              textAlign="center"
            >
              Log back into your account to continue
            </Text>
          </Box>
        </Box>

        <Box
          style={styles.formBox}
          flex={0.5}
          paddingHorizontal="s"
          alignItems="center"
          marginTop="m"
        >
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={16}>
              Your Leya Email
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="your email"
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => setEmail(email)}
              autoFocus={true}
            />
          </Box>

          <Box style={styles.formGroup} marginTop="l">
            <Text variant="medium" color="primaryText" fontSize={16}>
              Your Leya Passcode
            </Text>
            <Box style={styles.Icon}>
              <TouchableOpacity onPress={changeIcon}>
                <Ionicons
                  name={icon}
                  size={22}
                  color={Theme.colors.greenPrimary}
                />
              </TouchableOpacity>
            </Box>
            <TextInput
              style={[styles.input]}
              placeholder=""
              returnKeyType="done"
              secureTextEntry={isPassword}
              keyboardType="number-pad"
              value={passcode}
              onChangeText={(passcode) => setPasscode(passcode)}
            />
          </Box>
          {errors?.message && (
            <Text variant="small" color="red" marginTop="s">
              {errors?.message}
            </Text>
          )}
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="s"
          alignItems="center"
          justifyContent="center"
          marginBottom="m"
        >
          {!loading ? (
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={() => onValidate()}
            >
              <Text color="white" variant="medium" fontSize={20}>
                Login
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator size="small" color="#00A134" />
          )}
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.l,
  },
  input: {
    width: WIDTH - 30,
    height: moderateVerticalScale(48),
    borderRadius: 5,
    borderColor: 'rgba(145, 214,168,.5)',
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: Theme.colors.inputBG,
    color: Theme.colors.primaryText,
    fontFamily: 'GraphikRegular',
    marginTop: 10,
  },
  nextButton: {
    width: WIDTH - 30,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
  Icon: {
    position: 'absolute',
    top: Theme.spacing.xl + 5,
    right: moderateScale(10),
    zIndex: 1,
  },
});

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { LoginUser })(Credentials);
