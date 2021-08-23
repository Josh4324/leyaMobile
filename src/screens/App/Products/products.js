import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Theme, { Box, Text } from '../../../utils/theme';
import ScrollWrapper from '../../../components/scroll-wrapper';
import SafeWrapper from '../../../components/safe-wrapper';

import { connect } from 'react-redux';

import InvestmentSVG from '../../../../assets/images/investment.svg';
import InvestSVG from '../../../../assets/images/invest.svg';
import Coins from '../../../../assets/images/coins.svg';
import Loans from '../../../../assets/images/loans.svg';
import Trust from '../../../../assets/images/trust.svg';

function Products({ navigation, loan, investments }) {
  const { navigate } = navigation;
  const [route, setRoute] = useState('');
  const [investmentRoute, setInvestmentRoute] = useState('');
  console.log(investments);

  useEffect(() => {
    if (Object.keys(loan).length !== 0) {
      setRoute('ActiveLoan');
    } else {
      setRoute('Loans');
    }

    if (investments.length !== 0) {
      setInvestmentRoute('ActiveInvestment');
    } else {
      setInvestmentRoute('Investment');
    }
  });

  return (
    <Box flex={1}>
      <Box backgroundColor="greenPrimary" flex={0.3}>
        <SafeWrapper>
          <Box justifyContent="center" flex={1} paddingHorizontal="l">
            <Text color="white" variant="title">
              All Products
            </Text>
            <Text
              color="white"
              marginTop="m"
              opacity={0.6}
              variant="body"
              fontSize={15}
              lineHeight={23}
            >
              We offer a wide range of services tailored to helping individuals
              and businesses achieve their goals.
            </Text>
          </Box>
        </SafeWrapper>
      </Box>
      <Box backgroundColor="white" flex={0.7} paddingHorizontal="l">
        <Text variant="medium" marginTop="m" fontSize={18} color="black">
          Products
        </Text>

        <ScrollWrapper>
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => navigate(investmentRoute)}
          >
            <Box style={styles.productBox}>
              <Text variant="medium" marginTop="s" fontSize={18} color="black">
                Investments
              </Text>
              <Text
                variant="body"
                marginTop="s"
                fontSize={14}
                color="secondaryText"
              >
                An investment product just for you.
              </Text>

              <InvestmentSVG
                style={{
                  position: 'absolute',
                  right: -10,
                }}
              />
              <Coins
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 40,
                }}
              />
              <InvestSVG
                style={{
                  position: 'absolute',
                  right: -10,
                  bottom: 0,
                }}
              />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate(route)}>
            <Box style={styles.productBox}>
              <Text variant="medium" marginTop="s" fontSize={18} color="black">
                Loans
              </Text>
              <Text
                variant="body"
                marginTop="s"
                fontSize={14}
                color="secondaryText"
              >
                Request for funds with zero hassles.
              </Text>

              <Loans
                style={{
                  position: 'absolute',
                  right: -20,
                  top: 30,
                }}
              />
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('TrustFund')}>
            <Box style={styles.productBox}>
              <Text variant="medium" marginTop="s" fontSize={18} color="black">
                Trust Funds
              </Text>
              <Text
                variant="body"
                marginTop="s"
                fontSize={14}
                color="secondaryText"
              >
                Invest in a bright future for your ward.
              </Text>

              <Trust
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 30,
                }}
              />
            </Box>
          </TouchableOpacity>
        </ScrollWrapper>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  productBox: {
    height: moderateScale(120),
    backgroundColor: Theme.colors.greenOpacity,
    marginVertical: Theme.spacing.m,
    borderRadius: Theme.borderRadii.m,
    padding: Theme.spacing.m,
  },
});

const mapStateToProps = (state) => ({
  loan: state.loans?.loan,
  investments: state.investments?.investments,
});

export default connect(mapStateToProps, {})(Products);
