import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import Pattern from '../../../../../assets/images/home-pattern.svg';
import Theme, { Box, Text } from '../../../../utils/theme';

import { GetCustomerLoans } from '../../../../redux/Loans/loan-actions';
import SafeWrapper from '../../../../components/safe-wrapper';
import AppHeader from '../../../../components/app-header';
import LoanCard from '../../../../components/loan-card';
import EmptyState from '../../../../components/empty-state';
import ScrollWrapper from '../../../../components/scroll-wrapper';

import 'intl';
import 'intl/locale-data/jsonp/en-NG';

if (Platform.OS === 'android') {
  if (typeof Intl.__disableRegExpRestore === 'function') {
    Intl.__disableRegExpRestore();
  }
}

const { width: WIDTH } = Dimensions.get('window');

function ActiveLoan({ navigation, user, loan }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;

  function formatCurrency(num) {
    return Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(num);
  }

  useEffect(() => {
    const backAction = () => {
      navigate('Products');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
          <AppHeader name={user?.user?.firstName} router={navigate} />
          <LoanCard router={navigate} />
          <Box
            flexDirection="row"
            justifyContent="center"
            style={{ marginBottom: moderateScale(15), paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={[styles.actionButton]}
              onPress={() =>
                Alert.alert('Alert', 'You have a pending loan request.')
              }
            >
              <Text color="white" variant="medium" fontSize={16}>
                Request for a loan
              </Text>
              <Box style={styles.iconBox}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Theme.colors.dark}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </SafeWrapper>
      </Box>

      <Box flex={0.5} backgroundColor="white">
        <ScrollWrapper>
          <Box paddingHorizontal="m">
            <Text variant="medium" fontSize={18}>
              Pending Requests
            </Text>

            <Box
              style={styles.details}
              padding="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text variant="body">Loan Request</Text>
                <Text variant="body" color="secondaryText" fontSize={14}>
                  {moment(loan.createDate).format('DD MMM YYYY')}
                </Text>
              </Box>
              <Box>
                <Text variant="medium" fontSize={16}>
                  {formatCurrency(loan.loanAmount)}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box marginTop="s">
            <Box padding="m">
              <Text variant="medium" fontSize={18}>
                Activities
              </Text>
            </Box>

            <Box
              backgroundColor="inputBG"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              padding="s"
              borderTopWidth={1}
              borderBottomWidth={1}
              borderBottomColor="border"
              borderTopColor="border"
            >
              <Box style={styles.activityIcon}>
                <Ionicons
                  name="checkmark-done-outline"
                  size={22}
                  color={Theme.colors.greenPrimary}
                />
              </Box>
              <Box>
                <Text variant="medium" color="dark">
                  Loan Request Submitted
                </Text>
                <Text variant="body" color="primaryText" fontSize={12}>
                  {moment(loan.createDate).format('DD MMM YYYY')}
                </Text>
              </Box>
              <Box>
                <Text>{formatCurrency(loan.loanAmount)}</Text>
              </Box>
            </Box>
          </Box>
        </ScrollWrapper>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  details: {
    minHeight: moderateScale(100),
    borderWidth: 1,
    borderColor: Theme.colors.gold,
    backgroundColor: '#FFFAEB',
    borderRadius: 10,
    marginTop: Theme.spacing.l,
  },
  actionButton: {
    width: WIDTH - 40,
    backgroundColor: 'rgba(0,0,0,.4)',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    height: 24,
    width: 24,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,.4)',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  activityIcon: {
    height: 54,
    width: 54,
    marginLeft: 10,
    backgroundColor: Theme.colors.greenOpacity,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loan: state.loans.loan,
});

export default connect(mapStateToProps, {})(ActiveLoan);
