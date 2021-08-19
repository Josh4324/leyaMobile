import React, { useState, useEffect, Suspense } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';
import {
  FetchLoanProducts,
  SelectedLoan,
} from '../../../../redux/Loans/loan-actions';
import ScrollWrapper from '../../../../components/scroll-wrapper';

const { width: WIDTH } = Dimensions.get('window');

function LoanProducts({
  navigation,
  products,
  FetchLoanProducts,
  SelectedLoan,
}) {
  const { navigate } = navigation;
  const [selected, setSelected] = useState(null);
  const [optionsIndex, setOptionsIndex] = useState(0);
  const [selectedArr, setSelectedArr] = useState([]);

  const toggleActiveItem = (index, product) => {
    if (products.includes(index)) {
      setSelectedArr(products.filter((i) => i !== index));
      //   setSelected(index);
    } else {
      setSelectedArr([...selectedArr, index]);
      setSelected(index);
      SelectedLoan(product);
      console.log(product);
    }

    setOptionsIndex(index);
  };

  useEffect(() => {
    FetchLoanProducts();
  }, [FetchLoanProducts]);

  return (
    <Box flex={1} style={{ backgroundColor: 'white' }}>
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          flex={0.05}
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
            Loan Type
          </Text>

          <TouchableOpacity>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>

        <Box
          flex={0.2}
          backgroundColor="greenPrimary"
          paddingHorizontal="m"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text color="white" variant="title" fontSize={26} lineHeight={36}>
            What description best suits your profile?
          </Text>
        </Box>

        <Box flex={0.8} backgroundColor="white" paddingHorizontal="m">
          <ScrollWrapper>
            <Suspense
              fallback={<ActivityIndicator size="small" color="#00A134" />}
            >
              {products.map((product, index) => (
                <TouchableOpacity
                  style={[
                    styles.selectionBox,
                    {
                      backgroundColor:
                        index === selected ? '#00A134' : '#F9F9F9',
                    },
                  ]}
                  key={index + 1}
                  onPress={() => toggleActiveItem(index, product)}
                >
                  <Box padding="m">
                    <Box
                      borderBottomWidth={1}
                      style={{
                        borderBottomColor: '#DADADA',
                      }}
                    >
                      <Text
                        variant="medium"
                        color={index === selected ? 'white' : 'dark'}
                        fontSize={18}
                      >
                        {product.name}
                      </Text>

                      <Text
                        variant="body"
                        color={index === selected ? 'white' : 'dark'}
                        marginVertical="m"
                      >
                        {product.desc}
                      </Text>
                    </Box>

                    <Box
                      flexDirection="row"
                      marginTop="m"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text color={index === selected ? 'white' : 'dark'}>
                        Interest Rate:
                      </Text>
                      <Text
                        variant="medium"
                        color={index === selected ? 'white' : 'dark'}
                      >
                        {product?.interestRate}% Monthly
                      </Text>
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))}

              {selected === null ? null : (
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: Theme.colors.greenPrimary },
                  ]}
                  onPress={() => navigate('LoanAmount')}
                >
                  <Text color="white" variant="medium" fontSize={20}>
                    Continue
                  </Text>
                </TouchableOpacity>
              )}
            </Suspense>
          </ScrollWrapper>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  selectionBox: {
    minHeight: moderateScale(120),
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: Theme.borderRadii.m,
    marginBottom: Theme.spacing.l,
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
  products: state.loans.products,
});

export default connect(mapStateToProps, { FetchLoanProducts, SelectedLoan })(
  LoanProducts
);
