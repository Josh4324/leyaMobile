import React, { useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  useWindowDimensions,
  Image,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Button from '../components/button';
import Theme, { Box, Text } from '../utils/theme';
import Ripple from '../../assets/images/ripple.png';
import SuccessSVG from '../../assets/images/success.svg';
import PatternSVG from '../../assets/images/pattern.svg';
import SafeWrapper from './safe-wrapper';

import { connect } from 'react-redux';
import { RegisterUser } from '../store/Authentication/auth-actions';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

function Success({ navigation, text, routeName, RegisterUser, auth }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;

  const user = { name: 'folarin farinto' };

  const register = (user) => {
    RegisterUser(user);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [auth]);

  console.log('a', auth);

  return (
    <Box style={styles.wrapper} flex={1} position="relative">
      <PatternSVG
        style={{
          position: 'absolute',
          width: width,
          resizeMode: 'cover',
        }}
      />
      <SafeWrapper>
        <Box flex={1} alignItems="center" justifyContent="space-between">
          <Box style={styles.imageBox} flex={0.4} justifyContent="flex-end">
            <SuccessSVG
              style={{ width: width * 0.92, resizeMode: 'contain' }}
            />
          </Box>

          <Box justifyContent="flex-start" alignItems="center" flex={0.3}>
            <Text color="white" variant="medium" fontSize={30} marginTop="l">
              Congratulations!
            </Text>
            <Text
              color="white"
              variant="body"
              fontSize={20}
              textAlign="center"
              marginTop="l"
            >
              {text}
            </Text>
          </Box>
          <Box
            flex={0.1}
            paddingHorizontal="m"
            alignItems="center"
            justifyContent="center"
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => register(user)}
            >
              <Text color="greenPrimary" variant="medium" fontSize={20}>
                Continue
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { RegisterUser })(Success);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#00A134',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageBox: {},
  button: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});
