import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import validator from 'validator';

import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../components/safe-wrapper';
import KeyboardWrapper from '../../../components/keyboard-wrapper';
import { UpdateUser } from '../../../redux/Authentication/auth-actions';
import Theme, { Box, Text } from '../../../utils/theme';
import ScrollWrapper from '../../../components/scroll-wrapper';
import Upload from '../../../../assets/images/upload.svg';

const { width: WIDTH } = Dimensions.get('window');

function UpdateInformation({ navigation, user, UpdateUser, errors, loading }) {
  const { navigate } = navigation;

  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  console.log(loading);

  const onUpdate = () => {
    if (validator.isEmpty(bank.trim())) {
      return Alert.alert('Error', 'Bank name cannot not be empty.');
    }
    if (validator.isEmpty(accountNumber.trim())) {
      return Alert.alert('Error', 'Account number cannot not be empty.');
    }
    if (
      !validator.isLength(accountNumber.trim(), {
        min: 10,
        max: 10,
      })
    )
      return Alert.alert('Error', 'Account number must be 10 digits');

    const payload = {
      customerId: user?.customer?.customerId,
      BankName: bank.trim(),
      BankAccountNumber: accountNumber.trim(),
    };
    UpdateUser(payload, user?.user?.id, navigate);
  };

  return (
    <Box flex={1} style={{ backgroundColor: '#F9F9F9' }}>
      <StatusBar
        backgroundColor={Theme.colors.inputBG}
        barStyle="dark-content"
      />

      <KeyboardWrapper>
        <SafeWrapper propedStyles={{ flex: 0.05 }}>
          <Box
            flexDirection="row"
            paddingHorizontal="m"
            // flex={0.05}
            // paddingTop="xl"
            alignItems="center"
            style={{ backgroundColor: '#F9F9F9' }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                color={Theme.colors.greenPrimary}
                size={28}
              />
            </TouchableOpacity>
            <Text marginLeft="l" variant="medium" fontSize={16}>
              Update Account Information
            </Text>
          </Box>
        </SafeWrapper>

        <Box flex={user?.customer?.bankAccountNo ? 1 : 0.8}>
          <Box
            flex={0.2}
            backgroundColor="greenOpacity"
            justifyContent="center"
            alignItems="center"
          >
            <TouchableOpacity>
              <Upload />
            </TouchableOpacity>
            <Text marginTop="s">Tap to change picture</Text>
          </Box>
          <Box flex={0.8} backgroundColor="greenOpacity">
            <ScrollWrapper>
              <Box backgroundColor="white" padding="m">
                <Text variant="medium" fontSize={18} color="greenPrimary">
                  Personal Information
                </Text>

                <Box marginTop="l">
                  <Box style={styles.Icon}>
                    <Ionicons
                      name="lock-closed"
                      size={18}
                      color={Theme.colors.black}
                    />
                  </Box>
                  <Text variant="medium" color="primaryText" fontSize={14}>
                    First Name
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="default"
                    editable={false}
                    value={user?.user?.firstName}
                  />
                </Box>

                <Box marginTop="l">
                  <Box style={styles.Icon}>
                    <Ionicons
                      name="lock-closed"
                      size={18}
                      color={Theme.colors.black}
                    />
                  </Box>
                  <Text variant="medium" color="primaryText" fontSize={14}>
                    Middle Name
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="default"
                    editable={false}
                    // value={name}
                  />
                </Box>

                <Box marginTop="l">
                  <Box style={styles.Icon}>
                    <Ionicons
                      name="lock-closed"
                      size={18}
                      color={Theme.colors.black}
                    />
                  </Box>
                  <Text variant="medium" color="primaryText" fontSize={14}>
                    Last Name
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="default"
                    editable={false}
                    value={user?.user?.surame}
                  />
                </Box>
              </Box>

              <Box backgroundColor="white" padding="m" marginTop="xl">
                <Text variant="medium" fontSize={18} color="greenPrimary">
                  Contact Information
                </Text>

                <Box marginTop="l">
                  <Box style={styles.Icon}>
                    <Ionicons
                      name="lock-closed"
                      size={18}
                      color={Theme.colors.black}
                    />
                  </Box>
                  <Text variant="medium" color="primaryText" fontSize={14}>
                    Email
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="your name here"
                    keyboardType="default"
                    editable={false}
                    value={user?.user?.userId}
                  />
                </Box>

                <Box marginTop="l">
                  <Box style={styles.Icon}>
                    <Ionicons
                      name="lock-closed"
                      size={18}
                      color={Theme.colors.black}
                    />
                  </Box>
                  <Text variant="medium" color="primaryText" fontSize={14}>
                    Phone Number
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="your name here"
                    keyboardType="default"
                    editable={false}
                    value={'+' + user?.customer?.mobileNo}
                  />
                </Box>
              </Box>

              <Box backgroundColor="white" padding="m" marginTop="xl">
                <Text variant="medium" fontSize={18} color="greenPrimary">
                  Financial Information
                </Text>

                <Box marginTop="l">
                  {user?.customer?.bankName !== null && (
                    <Box style={styles.Icon}>
                      <Ionicons
                        name="lock-closed"
                        size={18}
                        color={Theme.colors.black}
                      />
                    </Box>
                  )}

                  <Text variant="medium" color="primaryText" fontSize={14}>
                    Bank
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Your Bank"
                    keyboardType="default"
                    returnKeyType="done"
                    editable={user?.customer?.bankName !== null ? false : true}
                    value={
                      user?.customer?.bankName ? user?.customer?.bankName : bank
                    }
                    onChangeText={(bank) => setBank(bank)}
                  />
                </Box>

                <Box marginTop="l">
                  {user?.customer?.bankName !== null && (
                    <Box style={styles.Icon}>
                      <Ionicons
                        name="lock-closed"
                        size={18}
                        color={Theme.colors.black}
                      />
                    </Box>
                  )}
                  <Text variant="medium" color="primaryText" fontSize={14}>
                    Account Number
                  </Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Your account number"
                    keyboardType="numeric"
                    editable={
                      user?.customer?.bankAccountNo !== null ? false : true
                    }
                    value={
                      user?.customer?.bankAccountNo
                        ? user?.customer?.bankAccountNo
                        : accountNumber
                    }
                    onChangeText={(accountNumber) =>
                      setAccountNumber(accountNumber)
                    }
                  />
                </Box>
              </Box>
            </ScrollWrapper>
          </Box>
        </Box>

        {user?.customer?.bankAccountNo ? null : (
          <Box
            flex={0.15}
            paddingHorizontal="s"
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: '#E5F6EB', marginBottom: 0 }}
          >
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={() => onUpdate()}
            >
              <Text color="white" variant="medium" fontSize={20}>
                Update
              </Text>
            </TouchableOpacity>
          </Box>
        )}
      </KeyboardWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    width: WIDTH - 30,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
  input: {
    width: WIDTH - 30,
    height: 50,
    borderRadius: 5,
    borderColor: 'rgba(218, 218, 218, 0.4)',
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 18,
    backgroundColor: Theme.colors.inputBG,
    color: Theme.colors.primaryText,
    fontFamily: 'GraphikRegular',
    marginTop: 10,
  },
  Icon: {
    position: 'absolute',
    top: Theme.spacing.xl,
    right: moderateScale(10),
    zIndex: 1,
  },

  disabledButton: {
    width: WIDTH - 30,
    height: 55,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { UpdateUser })(UpdateInformation);
