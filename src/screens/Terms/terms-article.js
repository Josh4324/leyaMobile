import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../components/safe-wrapper';
import SwipeButton from '../../components/swipe-button';
import Logo from '../../../assets/images/logo-alt.svg';

import Theme, { Box, Text } from '../../utils/theme';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function TermsArticle({ router, toggle, show }) {
  const { width, height } = useWindowDimensions();

  return (
    <SafeWrapper>
      <Box style={[styles.container, { width }]} flex={1}>
        <Box style={styles.header}>
          <Logo />

          <Box backgroundColor="greenOpacity" borderRadius="s">
            <TouchableOpacity onPress={() => toggle(!show)}>
              <Ionicons
                name="close-outline"
                size={28}
                color={Theme.colors.greenPrimary}
              />
            </TouchableOpacity>
          </Box>
        </Box>

        <ScrollView
          showsVerticaScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={32}
          style={{ height: 500 }}
        >
          <Box>
            <Text variant="heading" color="black" fontSize={20} marginTop="xl">
              Agreement
            </Text>
          </Box>
          <Box marginTop="s">
            <Text
              lineHeight={22}
              color="primaryText"
              fontSize={12}
              variant="body"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              aliquet diam et commodo, lectus proin vel facilisis sit. Sit
              natoque commodo suspendisse pharetra nec ut nullam id nam. At
              tortor, est eget congue semper non. Feugiat vulputate sem pulvinar
              dolor. Dignissim odio suspendisse ultrices ante nec. Id eu sed
              porttitor condimentum aliquam. Ut mi mauris nibh malesuada
              viverra. Lorem tempor id proin eleifend rutrum nisl, aliquam sit.
              Vitae pretium, consequat proin non nunc maecenas. Odio id mauris
              nunc, nisl diam risus. Rutrum ante augue amet velit odio
              elementum. Nulla tristique habitasse ipsum ipsum in. At fermentum
              euismod tellus bibendum. Nulla a nunc adipiscing tristique
              vulputate. Diam consectetur venenatis fermentum tempor, mattis
              purus praesent semper. Quam ullamcorper elementum ultricies dictum
              in. Viverra consequat, sed viverra sed faucibus sit. Fringilla
              volutpat diam elit ultrices. Quis dui aliquam id tortor enim. Quam
              ullamcorper elementum ultricies dictum in. Viverra consequat, sed
              viverra sed faucibus.
            </Text>

            <Text
              lineHeight={22}
              color="primaryText"
              fontSize={12}
              variant="body"
              marginTop="m"
            >
              mattis purus praesent semper. Quam ullamcorper elementum ultricies
              dictum in. Viverra consequat, sed viverra sed faucibus sit.
              Fringilla volutpat diam elit ultrices. Quis dui aliquam id tortor
              enim. Quam ullamcorper elementum ultricies dictum in. Viverra
              consequat, sed viverra sed faucibus.
            </Text>

            <Text
              lineHeight={22}
              color="primaryText"
              fontSize={12}
              variant="body"
              marginTop="m"
            >
              mattis purus praesent semper. Quam ullamcorper elementum ultricies
              dictum in. Viverra consequat, sed viverra sed faucibus sit.
              Fringilla volutpat diam elit ultrices. Quis dui aliquam id tortor
              enim. Quam ullamcorper elementum ultricies dictum in. Viverra
              consequat, sed viverra sed faucibus.
            </Text>
          </Box>
        </ScrollView>

        <Box marginTop="xxl">
          <SwipeButton router={router} />
        </Box>
      </Box>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    // height: moderateScale(900),
    padding: Theme.spacing.l,
    zIndex: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
