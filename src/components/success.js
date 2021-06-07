import React from 'react';
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
import SuccessImage from '../../assets/images/success.png';
import SafeWrapper from './safe-wrapper';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function Success({ navigation }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;

  return (
    <Box style={styles.wrapper} flex={1}>
      <ImageBackground
        source={Ripple}
        style={[styles.image, { width: width, resizeMode: 'cover' }]}
      >
        <SafeWrapper>
          <Box flex={1} alignItems="center" justifyContent="space-between">
            <Box style={styles.imageBox} flex={0.4} justifyContent="flex-end">
              <Image
                source={SuccessImage}
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
                Your registration is successful!
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
                onPress={() => navigate('AppStack')}
              >
                <Text color="greenPrimary" variant="medium" fontSize={20}>
                  Continue
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </SafeWrapper>
      </ImageBackground>
    </Box>
  );
}

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
