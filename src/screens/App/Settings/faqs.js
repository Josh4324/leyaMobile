import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Switch,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../components/safe-wrapper';
import { LogoutUser } from '../../../redux/Authentication/auth-actions';
import { MaskAmount } from '../../../redux/Investments/investment-actions';
import Theme, { Box, Text } from '../../../utils/theme';
import ScrollWrapper from '../../../components/scroll-wrapper';
export default function FAQS() {
  return (
    <Box>
      <Text></Text>
    </Box>
  );
}
