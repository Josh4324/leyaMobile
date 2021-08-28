import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { SetLoanTenor } from '../../../../redux/Loans/loan-actions';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';

const { width: WIDTH } = Dimensions.get('window');
function LoanTenor({ navigation, SetLoanTenor }) {
  const [tenor, setTenor] = useState(1);
  //   const [agree, setAgree] = useState(false);
  const { navigate } = navigation;

  const onIncrease = () => {
    if (tenor < 24) {
      setTenor(tenor + 1);
      console.log(tenor);
    } else {
      setTenor(24);
    }
  };

  const onDecrease = () => {
    if (tenor === 1) {
      setTenor(1);
    } else {
      setTenor(tenor - 1);
      console.log(tenor);
    }
  };

  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          flex={0.05}
          justifyContent="space-between"
          backgroundColor="white"
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
          <Text variant="medium" fontSize={16}>
            Loan Tenor
          </Text>
          <TouchableOpacity onPress={() => navigate('Products')}>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>

        <Box flex={1}>
          <Box
            flex={0.25}
            backgroundColor="greenPrimary"
            justifyContent="center"
            alignItems="flex-start"
            paddingHorizontal="m"
          >
            <Text variant="title" fontSize={32} lineHeight={35}>
              How long do you intend to repay the loan?
            </Text>
          </Box>

          <Box flex={0.4}>
            <Box paddingHorizontal="m" paddingVertical="m">
              <Text variant="body" color="black">
                Select your preferred tenor
              </Text>

              <Box style={styles.selectionBox}>
                <Box>
                  <Text color="white">{tenor} Months</Text>
                </Box>

                <Box flexDirection="row">
                  <TouchableOpacity
                    style={[styles.iconBox, { marginRight: 20 }]}
                    onPress={() => onDecrease()}
                  >
                    <Box>
                      <Ionicons
                        name="remove-outline"
                        size={20}
                        color={Theme.colors.dark}
                      />
                    </Box>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.iconBox}
                    onPress={() => onIncrease()}
                  >
                    <Box>
                      <Ionicons
                        name="add-outline"
                        size={20}
                        color={Theme.colors.dark}
                      />
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            flex={0.3}
            paddingHorizontal="m"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box paddingHorizontal="m" marginTop="l" style={styles.disclaimer}>
              <Box alignItems="center" style={styles.whyBox} flex={0.1}>
                <Ionicons
                  name="bulb-outline"
                  color={Theme.colors.greenPrimary}
                  size={32}
                />
              </Box>

              <Box flex={0.9} marginLeft="m">
                <Text
                  color="greenPrimary"
                  variant="body"
                  fontSize={13}
                  lineHeight={20}
                >
                  Please note that an additional fee of 0.5% is charged for each
                  month you default in payment.
                </Text>
              </Box>
            </Box>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                SetLoanTenor(tenor);
                navigate('LoanConfirmation');
              }}
            >
              <Text color="white" variant="medium" fontSize={20}>
                Next
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </SafeWrapper>
    </Box>
  );
}
const styles = StyleSheet.create({
  selectionBox: {
    minHeight: 50,
    backgroundColor: Theme.colors.black,
    borderRadius: Theme.borderRadii.s,
    paddingHorizontal: Theme.spacing.m,
    marginTop: Theme.spacing.m,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    height: 24,
    width: 24,
    backgroundColor: '#FFCA33',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  checkCircle: {
    height: 20,
    width: 20,
    borderRadius: Theme.borderRadii.l,
    borderColor: Theme.colors.white,
    borderWidth: 1.5,
    marginRight: Theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    height: 12,
    width: 12,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadii.l,
  },
  button: {
    width: WIDTH - 40,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
  disclaimer: {
    flexDirection: 'row',
    minHeight: moderateScale(80),
    width: WIDTH - 40,
    borderWidth: 1,
    borderColor: 'rgba(0, 161, 52, 0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.colors.greenOpacity,
  },
});

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { SetLoanTenor })(LoanTenor);
