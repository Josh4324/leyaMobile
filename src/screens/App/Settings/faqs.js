import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
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
export default function FAQS({ navigation }) {
  const { navigate } = navigation;
  return (
    <Box flex={1} style={{ backgroundColor: 'white' }}>
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />

      <SafeWrapper propedStyles={{ flex: 0.07 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          justifyContent="space-between"
          backgroundColor="white"
          alignItems="flex-end"
          alignContent="center"
          // paddingVertical="s"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={24}
            />
          </TouchableOpacity>
          <Text variant="medium" fontSize={16}>
            FAQS
          </Text>

          <TouchableOpacity onPress={() => navigate('Settings')}>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeWrapper>

      <Box flex={1}>
        <Box
          flex={0.2}
          backgroundColor="greenPrimary"
          justifyContent="center"
          alignItems="flex-start"
          paddingHorizontal="m"
        >
          <Text variant="title" fontSize={26} lineHeight={35}>
            What can we help you with?
          </Text>
        </Box>

        <Box flex={0.8}>
          <Box flexDirection="row" paddingHorizontal="m" paddingVertical="m">
            <ScrollView
              style={styles.scrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEventThrottle={32}
            >
              <TouchableOpacity>
                <Box style={styles.pill}>
                  <Text>INVESTMENTS</Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity>
                <Box style={styles.pill}>
                  <Text>BEANS</Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity>
                <Box style={styles.pill}>
                  <Text>GADGET FINANCING</Text>
                </Box>
              </TouchableOpacity>
            </ScrollView>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    borderRadius: Theme.borderRadii.l,
    padding: Theme.spacing.s,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
});
