import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import Theme, { Box, Text } from '../../../../utils/theme';
import ScrollWrapper from '../../../../components/scroll-wrapper';
import SafeWrapper from '../../../../components/safe-wrapper';
import Clover from '../../../../../assets/images/clover.svg';
import Adjust from '../../../../../assets/images/adjust.svg';
import Coin from '../../../../../assets/images/coin.svg';
import Discount from '../../../../../assets/images/discount.svg';
import Rise from '../../../../../assets/images/rise.svg';

const { width: WIDTH } = Dimensions.get('window');

export default function Loans({ navigation }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;
  return (
    <Box flex={1} backgroundColor="greenPrimary">
      <StatusBar
        backgroundColor={Theme.colors.greenPrimary}
        barStyle="light-content"
      />

      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          flex={0.08}
          alignItems="center"
          position="relative"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.white}
              size={28}
            />
          </TouchableOpacity>
          <Text
            style={{ marginLeft: width * 0.32, marginTop: 5 }}
            variant="medium"
            fontSize={16}
          >
            <Clover style={{}} />
          </Text>
        </Box>

        <Box justifyContent="center" paddingHorizontal="l" paddingVertical="l">
          <Text color="white" variant="medium" fontSize={26}>
            Loans
          </Text>
          <Text
            color="white"
            marginTop="m"
            opacity={0.6}
            variant="body"
            fontSize={15}
            lineHeight={23}
          >
            Learn all about our loan packages.
          </Text>
        </Box>

        <Box style={styles.wrapper}>
          <Box style={styles.item}>
            <Box style={styles.itemInner}>
              <Coin />
              <Text
                color="white"
                variant="medium"
                fontSize={16}
                lineHeight={24}
              >
                Minimum Loan of ₦5,000
              </Text>
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.itemInner}>
              <Rise />
              <Text
                color="white"
                variant="medium"
                fontSize={16}
                lineHeight={24}
              >
                Easy repayment plans
              </Text>
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.itemInner}>
              <Discount />
              <Text
                color="white"
                variant="medium"
                fontSize={16}
                lineHeight={24}
              >
                Effective loan disbursement
              </Text>
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.itemInner}>
              <Adjust />
              <Text
                color="white"
                variant="medium"
                fontSize={16}
                lineHeight={24}
              >
                Tenors between 3 to 9 months
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('InvestmentRequest')}
          >
            <Text color="greenPrimary" variant="body" fontSize={20}>
              Get Started
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: Theme.spacing.m,
  },
  item: {
    width: '50%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInner: {
    minHeight: moderateScale(200),
    backgroundColor: '#029331',
    width: '100%',
    borderRadius: 15,
    padding: Theme.spacing.m,
    justifyContent: 'space-evenly',
  },
  button: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});
