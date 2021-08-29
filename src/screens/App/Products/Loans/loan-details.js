import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';

import 'intl';
import 'intl/locale-data/jsonp/en-NG';
if (Platform.OS === 'android') {
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}

const { width: WIDTH } = Dimensions.get('window');

function LoanDetails({ navigation, loan }) {
  function formatCurrency(num) {
    return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(num);
  }

  return (
    <Box flex={1} backgroundColor="inputBG">
      <StatusBar backgroundColor="#F9F9F9" barStyle="dark-content" />
      <SafeWrapper propedStyles={{ flex: 0.07 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          alignContent="center"
          backgroundColor="inputBG"
          alignItems="flex-end"
          paddingVertical="s"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={28}
            />
          </TouchableOpacity>
          <Text marginLeft="xxxl" variant="medium" fontSize={16}>
            Request Details
          </Text>
        </Box>
      </SafeWrapper>

      <Box backgroundColor="white" flex={1} paddingHorizontal="m">
        <Box style={styles.details} padding="m">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Request Type:</Text>

            <Text color="dark" variant="medium">
              Loan Request
            </Text>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s"
          >
            <Text>Status:</Text>
            <Box
              style={{
                backgroundColor: 'rgba(255, 202,51, 0.3)',
                padding: 8,
                borderRadius: 5,
              }}
            >
              <Text color="gold">Pending</Text>
            </Box>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s"
          >
            <Text>Loan Amount:</Text>
            <Text color="dark" variant="medium" fontSize={16}>
              {formatCurrency(loan.loanAmount)}
            </Text>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s"
          >
            <Text>Interest Rate:</Text>
            <Text color="dark" variant="medium" fontSize={16}>
              {loan.interestRate}%
            </Text>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s"
          >
            <Text>Account officer:</Text>

            <Text color="dark" variant="medium" fontSize={16}>
              Not Assigned
            </Text>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s"
          >
            <Text>Tenor:</Text>

            <Text color="dark" variant="medium" fontSize={16}>
              {loan.tenor}
            </Text>
          </Box>
        </Box>

        <Box
          flex={0.9}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="flex-end"
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text color="white" variant="medium" fontSize={20}>
              Back
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  details: {
    minHeight: moderateScale(170),
    borderWidth: 1,
    borderColor: Theme.colors.gold,
    borderRadius: 10,
    marginTop: Theme.spacing.l,
    backgroundColor: '#FFFAEB',
  },
  intrest: {
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    borderRadius: 10,
    marginTop: Theme.spacing.m,
    backgroundColor: 'white',
  },

  button: {
    width: WIDTH - 40,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  loan: state.loans.loan,
});
export default connect(mapStateToProps)(LoanDetails);
