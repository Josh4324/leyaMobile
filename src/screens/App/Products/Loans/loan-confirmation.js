import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { RequestLoan } from '../../../../redux/Loans/loan-actions';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';
import ScrollWrapper from '../../../../components/scroll-wrapper';

import 'intl';
import 'intl/locale-data/jsonp/en-NG';
if (Platform.OS === 'android') {
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}

const { width: WIDTH } = Dimensions.get('window');

function LoanConfirmation({
  navigation,
  selectedProduct,
  loanAmount,
  loanTenor,
  RequestLoan,
  user,
  loading,
  errors,
}) {
  const { navigate } = navigation;

  function formatCurrency(num) {
    return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(num);
  }

  function calculateRepayment() {
    let amt = parseInt(loanAmount);
    let interest = parseInt(selectedProduct.interestRate);
    let tenor = loanTenor;
    let principal = amt * (interest / 100) * tenor + amt;

    let repayment = principal / tenor;
    console.log(amt, interest, tenor, principal, formatCurrency(repayment));
    return formatCurrency(repayment);
  }

  const onRequest = () => {
    const payload = {
      loanProductId: selectedProduct.id,
      customerId: user.customer.customerId,
      tenor: loanTenor,
      loanAmount: parseInt(loanAmount),
    };
    console.log(payload);
    RequestLoan(payload, navigate);
  };
  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <SafeWrapper propedStyles={{ flex: 0.07 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          justifyContent="space-between"
          backgroundColor="white"
          alignItems="flex-end"
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
          <TouchableOpacity>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeWrapper>

      <Box flex={0.9}>
        <ScrollWrapper>
          <Box
            backgroundColor="white"
            justifyContent="center"
            alignItems="flex-start"
            paddingHorizontal="m"
          >
            <Text variant="title" color="black" fontSize={24} lineHeight={35}>
              Let’s go over your {selectedProduct.name} loan request
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
            <Text>Loan Request Details:</Text>

            <Box flex={0.6}>
              <Box style={styles.details} padding="m">
                <Box
                  borderBottomWidth={1}
                  borderBottomColor="greenPrimary"
                  paddingBottom="l"
                >
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>Proposed Amount:</Text>
                    <Box>
                      <Text color="black" variant="medium">
                        {formatCurrency(loanAmount)}
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
                      {loanTenor} months
                    </Text>
                  </Box>

                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop="m"
                  >
                    <Text>Monthly Repayment:</Text>
                    <Text color="primaryText" variant="medium" fontSize={16}>
                      {calculateRepayment()}
                    </Text>
                  </Box>
                </Box>

                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="m"
                >
                  <Text>Monthly Interest:</Text>
                  <Box>
                    <Text color="black" variant="medium">
                      {selectedProduct.interestRate}% Monthly
                    </Text>
                  </Box>
                </Box>

                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="m"
                >
                  <Text>Default Fee:</Text>
                  <Box>
                    <Text color="black" variant="medium">
                      0.05%
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            flex={0.4}
            paddingHorizontal="m"
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
    marginBottom: 10,
  },

  details: {
    minHeight: moderateScale(100),
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    backgroundColor: Theme.colors.greenOpacity,
    borderRadius: 10,
    marginTop: Theme.spacing.l,
  },
});

const mapStateToProps = (state) => ({
  selectedProduct: state.loans.selectedProduct,
  loanAmount: state.loans.loanAmount,
  loanTenor: state.loans.loanTenor,
  user: state.auth.user,
  loading: state.loans.loading,
  errors: state.loans.errors,
});

export default connect(mapStateToProps, { RequestLoan })(LoanConfirmation);
