import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  View,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Theme, { Box, Text } from '../utils/theme';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  runOnUI,
} from 'react-native-reanimated';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const BUTTON_WIDTH = WIDTH - 155;
const BUTTON_HEIGHT = 55;
const BUTTON_PADDING = 8;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

export default function SwipeButton({ router }) {
  const X = useSharedValue(0);
  const interpolateXInput = [0, H_SWIPE_RANGE];

  const triggerAlert = () => {
    // Alert.alert('Got it');
    router('PersonalInformation');
  };

  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      X.value = e.translationX;
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
      } else {
        X.value = withSpring(BUTTON_WIDTH);
        runOnJS(triggerAlert)();
      }
    },
    onFinish: () => {},
  });

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return { transform: [{ translateX: X.value }], backgroundColor: 'white' };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(X.value, interpolateXInput, [
          1,
          0,
          Extrapolate.CLAMP,
        ]),
        transform: [
          {
            translateX: interpolate(X.value, interpolateXInput, [
              0,
              BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS,
              Extrapolate.CLAMP,
            ]),
          },
        ],
      };
    }),
  };

  return (
    <Box>
      <Box style={styles.swipeButton}>
        <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View style={[styles.swipeCircle, AnimatedStyles.swipeable]}>
            <AntDesign
              name="doubleright"
              size={22}
              color={Theme.colors.greenPrimary}
            />
          </Animated.View>
        </PanGestureHandler>
        <Animated.Text style={[styles.animatedText, AnimatedStyles.swipeText]}>
          Swipe to agree & Continue
        </Animated.Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  swipeButton: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    borderRadius: 50,
    paddingHorizontal: Theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  swipeCircle: {
    width: 45,
    height: 45,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 10,
  },
  animatedText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'GraphikMedium',
    alignSelf: 'center',
  },
});
