import React from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme, { Box, Text } from '../../utils/theme';
import SafeWrapper from '../../components/safe-wrapper';
import Knot from '../../../assets/images/knot.png';
import { moderateScale } from 'react-native-size-matters';

export default function Landing({ navigation }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;

  return (
    <Box flex={1} backgroundColor="greenOpacity">
      <StatusBar barStyle="dark-content" backgroundColor="#E5F6EB" />
      <Box flex={0.7}>
        <Image source={Knot} style={{ width, resizeMode: 'cover' }} />
      </Box>

      <Box flex={0.3} height="100%" justifyContent="space-between">
        <Box padding="m">
          <Text variant="title" color="black" lineHeight={45}>
            Your all-in-one financial powerhouse
          </Text>
        </Box>

        <Box style={{ height: moderateScale(80) }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: Theme.colors.greenPrimary,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
            onPress={() => navigate('Onboarding')}
          >
            <Text variant="medium" color="white" fontSize={20} marginRight="m">
              Get Started
            </Text>
            <Ionicons
              name="arrow-forward-outline"
              size={26}
              color={Theme.colors.white}
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
