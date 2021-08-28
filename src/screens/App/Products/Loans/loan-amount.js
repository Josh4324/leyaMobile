import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { SetLoanAmount } from '../../../../redux/Loans/loan-actions';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';

import 'intl';
import 'intl/locale-data/jsonp/en-NG';

const { width: WIDTH } = Dimensions.get('window');

if (Platform.OS === 'android') {
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}

function LoanAmount({ navigation, SetLoanAmount, selectedProduct }) {
  const { navigate } = navigation;
  const [amount, setAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  function formatCurrency(num) {
    return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(num);
  }

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
              size={28}
            />
          </TouchableOpacity>
          <Text variant="medium" fontSize={16}>
            Loan Amount
          </Text>

          <TouchableOpacity onPress={() => navigate('Products')}>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeWrapper>

      <Box flex={1} justifyContent="space-between" backgroundColor="darkGreen">
        <Box paddingHorizontal="m" marginTop="xl">
          <Text color="white" variant="medium" fontSize={26} lineHeight={36}>
            How much would you like to borrow?
          </Text>

          <Box style={styles.inputBox}>
            {isEditing ? (
              <TextInput
                style={[styles.input]}
                placeholder="₦0"
                keyboardType="numeric"
                returnKeyType="done"
                placeholderTextColor="white"
                onChangeText={(amount) => setAmount(amount)}
                value={amount}
                onBlur={() => setIsEditing(!isEditing)}
              />
            ) : (
              <TextInput
                style={[styles.input]}
                placeholder="₦0"
                keyboardType="numeric"
                returnKeyType="done"
                placeholderTextColor="white"
                onChangeText={(amount) => setAmount(amount)}
                value={formatCurrency(amount)}
                onFocus={() => setIsEditing(!isEditing)}
              />
            )}

            <Box
              marginTop="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="white" fontSize={14} variant="body">
                Monthly interest rate ({selectedProduct.interestRate}%):{' '}
              </Text>
              <Text color="white" fontSize={14} variant="body">
                {formatCurrency((amount * selectedProduct.interestRate) / 100)}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box></Box>

        <Box style={{ marginBottom: 50 }}>
          {amount === '' ? (
            <Box
              style={[
                styles.button,
                { backgroundColor: 'rgba(255, 255,255, 0.5)' },
              ]}
            >
              <Text color="greenPrimary" variant="medium" fontSize={20}>
                Continue
              </Text>
            </Box>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Theme.colors.white }]}
              onPress={() => {
                SetLoanAmount(amount);
                navigate('LoanTenor');
              }}
            >
              <Text color="greenPrimary" variant="medium" fontSize={20}>
                Continue
              </Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    height: moderateScale(170),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: '#196E34',
    marginTop: Theme.spacing.xl,
    justifyContent: 'center',
    padding: Theme.spacing.m,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255, 0.2)',
    textAlign: 'center',
    color: 'white',
    paddingBottom: 30,
    fontSize: 30,
    fontFamily: 'GraphikBold',
  },
  button: {
    width: WIDTH - 30,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  selectedProduct: state.loans.selectedProduct,
});

export default connect(mapStateToProps, { SetLoanAmount })(LoanAmount);
