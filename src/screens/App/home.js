import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import SafeWrapper from '../../components/safe-wrapper';
import { Ionicons } from '@expo/vector-icons';
import Theme, { Box, Text } from '../../utils/theme';
import Pattern from '../../../assets/images/home-pattern.svg';
import { moderateScale } from 'react-native-size-matters';

import AppHeader from '../../components/app-header';
import AccountCard from '../../components/account-card';
import EmptyState from '../../components/empty-state';

export default function Home({ navigation }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;

  return (
    <Box flex={1}>
      <StatusBar
        backgroundColor={Theme.colors.greenPrimary}
        barStyle="light-content"
      />
      <Box flex={0.5} backgroundColor="greenPrimary">
        <SafeWrapper propedStyles={{ position: 'relative' }}>
          <Pattern
            width={width}
            style={{
              position: 'absolute',
              resizeMode: 'cover',
            }}
          />
          <AppHeader />
          <AccountCard router={navigate} />

          <Box
            flexDirection="row"
            justifyContent="center"
            style={{ marginBottom: moderateScale(15), paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={[styles.actionButton, { marginRight: 28 }]}
              onPress={() => navigate('Investment')}
            >
              <Text color="white" variant="medium" fontSize={16}>
                Add Funds
              </Text>
              <Box style={styles.iconBox}>
                <Ionicons
                  name="add-outline"
                  size={20}
                  color={Theme.colors.dark}
                />
              </Box>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton]}>
              <Text color="white" variant="medium" fontSize={16}>
                Withdraw
              </Text>
              <Box style={styles.iconBox}>
                <Ionicons
                  name="remove-outline"
                  size={20}
                  color={Theme.colors.dark}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </SafeWrapper>
      </Box>
      <EmptyState />
    </Box>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: moderateScale(150),
    backgroundColor: Theme.colors.dark,
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
