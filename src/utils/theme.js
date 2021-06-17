import { createText, createBox } from '@shopify/restyle';
import { moderateScale } from 'react-native-size-matters';

const Theme = {
  colors: {
    greenPrimary: '#00A134',
    greenOpacity: '#E5F6EB',
    ligtherGreen: '#F2FAF5',
    darkGreen: '#005E1E',
    gold: '#FFCA33',
    black: '#333333',
    dark: '#222222',
    primaryText: '#484848',
    secondaryText: '#666666',
    red: '#F85857',
    white: '#ffffff',
    inputBG: '#F9F9F9',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
    xxxl: 80,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    title: {
      fontSize: moderateScale(32),
      fontFamily: 'GraphikBold',
      color: 'white',
    },

    heading: {
      fontSize: moderateScale(20),
      fontFamily: 'GraphikBold',
      color: 'white',
    },
    smallHeading: {
      fontSize: moderateScale(15),
      fontFamily: 'GraphikBold',
      color: 'white',
    },
    medium: {
      fontFamily: 'GraphikMedium',
    },
    body: {
      fontSize: 16,
      lineHeight: 30,
      fontFamily: 'GraphikRegular',
      color: 'primaryText',
    },
    small: {
      fontSize: 12,
      fontFamily: 'GraphikRegular',
      color: 'primaryText',
    },
  },
  breakpoints: {},
};

export const Text = createText();
export const Box = createBox();
export default Theme;
