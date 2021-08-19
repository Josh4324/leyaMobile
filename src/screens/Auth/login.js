import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { LoginUser } from '../../redux/Authentication/auth-actions';

import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../components/safe-wrapper';
import Theme, { Box, Text } from '../../utils/theme';
import Logo from '../../../assets/images/logo.png';
import Leaf from '../../../assets/images/leaf.svg';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

function Login({ LoginUser, errors, navigation, loading }) {
  const { width, height } = useWindowDimensions();
  const { navigate } = navigation;

  const [passcode, setPassCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      let nm = await AsyncStorage.getItem('firstName');
      let em = await AsyncStorage.getItem('email');
      setName(nm);
      setEmail(em);
    })();
  });

  const onLogin = (code) => {
    const payload = { userId: email, password: code };
    console.log(payload);
    LoginUser(payload, navigate);
  };

  return (
    <Box flex={1} backgroundColor="greenOpacity">
      <SafeWrapper>
        <Leaf
          width={width}
          style={{
            position: 'absolute',
            resizeMode: 'cover',
          }}
        />
        <Box flex={1}>
          <Box style={[styles.imageBox]}>
            <Image
              source={Logo}
              style={{
                width: width * 0.14,
                height: height / 8,
                resizeMode: 'contain',
              }}
            />
            <Text variant="medium" color="black" marginTop="l" fontSize={20}>
              Welcome Back, {name}
            </Text>
          </Box>

          <Box padding="m">
            <Box paddingHorizontal="m" marginTop="xl" style={styles.disclaimer}>
              <Box alignItems="center" marginTop="m">
                <Text variant="body" color="black" fontSize={16}>
                  Enter Your Passcode
                </Text>
              </Box>

              <Box>
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
                  returnKeyType="done"
                  secureTextEntry={true}
                  placeholderTextColor={Theme.colors.gold}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={(code) => {
                    onLogin(code);
                  }}
                />
              </Box>
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginVertical="m"
            >
              <Box>
                <TouchableOpacity style={styles.resetButton}>
                  <Text>Forgot Passcode?</Text>
                  <Text variant="medium" marginLeft="s" color="greenPrimary">
                    Reset Passcode
                  </Text>
                </TouchableOpacity>
              </Box>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate('Credentials')}
              >
                <Text variant="medium" color="greenPrimary" fontSize={14}>
                  Not {name}?
                </Text>
              </TouchableOpacity>
            </Box>
            {loading && <ActivityIndicator size="small" color="#00A134" />}
            {errors?.message && (
              <Text variant="small" color="red" marginTop="l" fontSize={16}>
                {errors?.message}
              </Text>
            )}
          </Box>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
  },
  disclaimer: {
    minHeight: moderateScale(120),
    borderWidth: 1,
    borderColor: 'rgba(0, 161, 52, 0.6)',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.colors.white,
  },
  underlineStyleBase: {
    width: 20,
    height: 20,
    borderWidth: 0,
    borderWidth: 1.5,
    borderRadius: Theme.borderRadii.l,
    borderColor: 'rgba(218, 218, 218, 0.4)',
    color: Theme.colors.gold,
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
  button: {
    backgroundColor: 'rgba(145, 214,168,.3)',
    padding: Theme.spacing.s,
    borderRadius: Theme.borderRadii.s,
  },

  resetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { LoginUser })(Login);
