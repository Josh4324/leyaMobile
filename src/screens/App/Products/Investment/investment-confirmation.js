import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';

import 'intl';
import 'intl/locale-data/jsonp/en-NG';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';
import ScrollWrapper from '../../../../components/scroll-wrapper';
import { RequestInvestment } from '../../../../redux/Investments/investment-actions';

const { width: WIDTH } = Dimensions.get('window');

if (Platform.OS === 'android') {
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}
function InvestmentConfirmation({
  navigation,
  investmentAmount,
  investmentTenor,
  RequestInvestment,
  errors,
  user,
  loading,
}) {
  const { navigate } = navigation;

  function formatCurrency(num) {
    return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(num);
  }

  const onRequest = () => {
    const payload = {
      accountManagerId: 1,
      investmentProductId: 1,
      tenor: investmentTenor,
      customerId: user.customer.customerId,
      amount: parseInt(investmentAmount),
      startDate: moment(Date.now()).format('YYYY-MM-DD'),
    };
    console.log(payload);
    RequestInvestment(payload, navigate);
  };

  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <SafeWrapper
        propedStyles={{
          flex: 0.07,
        }}
      >
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          justifyContent="space-between"
          backgroundColor="white"
          alignItems="flex-end"
          alignContent="center"
          paddingVertical="s"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={28}
            />
          </TouchableOpacity>
          <Text variant="medium" fontSize={16}>
            Confirm Request
          </Text>
          <TouchableOpacity onPress={() => navigate('Products')}>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeWrapper>

      <Box flex={1}>
        <ScrollWrapper>
          <Box
            backgroundColor="white"
            justifyContent="center"
            alignItems="flex-start"
            paddingHorizontal="m"
            // paddingVertical="s"
          >
            <Text variant="title" color="black" fontSize={24} lineHeight={35}>
              Let’s go over your top-up request
            </Text>

            <Text marginTop="m" color="secondaryText" lineHeight={23}>
              Confirm the details below are accurate and an email will
              automatically be sent to your account officer to inform them of
              your request.
            </Text>
          </Box>

          <Box
            paddingHorizontal="m"
            paddingVertical="l"
            justifyContent="center"
          >
            <Text>Investment Request Details:</Text>

            <Box flex={0.6}>
              <Box style={styles.details} padding="m">
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>Proposed Amount:</Text>
                  <Box>
                    <Text color="black" variant="medium">
                      {formatCurrency(investmentAmount)}
                    </Text>
                  </Box>
                </Box>

                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="m"
                >
                  <Text>Tenor:</Text>
                  <Text color="primaryText" variant="medium" fontSize={16}>
                    {investmentTenor} months
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            flex={0.4}
            paddingHorizontal="m"
            marginTop="xl"
            alignItems="center"
            justifyContent="flex-end"
          >
            {errors?.message && (
              <Text variant="body" color="red">
                {errors?.message}
              </Text>
            )}

            {loading ? (
              <ActivityIndicator size="small" color="#00A134" />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onRequest()}
                >
                  <Text color="white" variant="medium" fontSize={20}>
                    Next
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    { marginTop: 10, backgroundColor: Theme.colors.red },
                  ]}
                  onPress={() => navigate('Products')}
                >
                  <Text color="white" variant="medium" fontSize={20}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Box>
        </ScrollWrapper>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  button: {
    width: WIDTH - 40,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },

  details: {
    minHeight: moderateScale(100),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    backgroundColor: Theme.colors.greenOpacity,
    borderRadius: 10,
    marginTop: Theme.spacing.l,
  },
});

const mapStateToProps = (state) => ({
  investmentAmount: state.investments.investmentAmount,
  investmentTenor: state.investments.investmentTenor,
  user: state.auth.user,
  loading: state.investments.loading,
  errors: state.investments.errors,
});

export default connect(mapStateToProps, { RequestInvestment })(
  InvestmentConfirmation
);
