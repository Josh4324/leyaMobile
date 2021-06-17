import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Switch,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import SafeWrapper from './safe-wrapper';
import { Ionicons } from '@expo/vector-icons';
import Theme, { Box, Text } from '../utils/theme';
import Pattern from '../../assets/images/home-pattern.svg';
import Plant from '../../assets/images/plant.svg';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function AccountCard({ router }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState('27,000,000');

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const maskAmount = (amt) => {
    return amt.replace(/./g, '*');
  };

  return (
    <Box style={styles.accountCard}>
      <Box style={styles.cardInner}>
        <Box style={styles.shadow} />
        <Box style={styles.shadow2} />

        <Plant
          style={{
            position: 'absolute',
            bottom: 0,
            left: 10,
          }}
        />

        <Plant
          style={{
            position: 'absolute',
            bottom: 0,
            left: 100,
          }}
        />

        <Box style={styles.cardContent} padding="m">
          <Box flexDirection="row" justifyContent="space-between">
            <Box marginTop="m">
              <Text variant="heading" color="primaryText" fontSize={20}>
                ₦{isEnabled ? maskAmount(amount) : amount}
              </Text>
              <Text variant="body" fontSize={14} marginTop="s">
                Your Portfolio
              </Text>
            </Box>

            <Box
              flexDirection="row"
              alignItems="center"
              style={{ marginTop: -50 }}
            >
              <Text fontSize={12} marginRight="s">
                Hide Amount
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#00A134' }}
                thumbColor={isEnabled ? '#E5F6EB' : '#f4f3f4'}
                ios_backgroundColor="rgba(143, 155, 179, 0.16);"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </Box>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          paddingHorizontal="m"
          marginTop="m"
        >
          <Text variant="body" fontSize={14} marginRight="s">
            View Details
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router('PortfolioDetails')}
          >
            <Box>
              <Ionicons
                name="arrow-forward-outline"
                size={22}
                color={Theme.colors.white}
              />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  accountCard: {
    flex: 1,
    alignItems: 'center',
  },

  cardInner: {
    height: moderateScale(170),
    backgroundColor: Theme.colors.white,
    width: WIDTH - 30,
    marginTop: Theme.spacing.l,
    borderRadius: 10,

    position: 'absolute',
  },
  shadow: {
    minHeight: 20,
    width: WIDTH - 55,
    backgroundColor: 'rgba(255,255,255, .3)',
    position: 'absolute',
    alignSelf: 'center',
    top: -8,
    borderRadius: 8,
  },
  shadow2: {
    minHeight: 40,
    width: WIDTH - 80,
    backgroundColor: 'rgba(255,255,255, .1)',
    position: 'absolute',
    alignSelf: 'center',
    top: -14,
    borderRadius: 8,
  },
  nextButton: {
    height: 34,
    width: 34,
    borderRadius: Theme.borderRadii.xl,
    backgroundColor: Theme.colors.greenPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
