import React from "react";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { connect } from "react-redux";
import { RequestLoan } from "../../../redux/Loans/loan-actions";
import SafeWrapper from "../../../components/safe-wrapper";
import Theme, { Box, Text } from "../../../utils/theme";
import ScrollWrapper from "../../../components/scroll-wrapper";

import "intl";
import "intl/locale-data/jsonp/en-NG";
if (Platform.OS === "android") {
  if (typeof Intl.__disableRegExpRestore === "function") {
    Intl.__disableRegExpRestore();
  }
}

const { width: WIDTH } = Dimensions.get("window");

function About({
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
    return Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
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
            About Leya
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
            <Text
              marginTop="m"
              lineHeight={20}
              color="secondaryText"
              lineHeight={23}
            >
              We designed the Leya App with goal in mind; to ease processes for
              our clients and improve the quality of service applications.
            </Text>

            <Text marginTop="m" color="secondaryText" lineHeight={23}>
              You can now access all our loan and investment options directly
              from your smartphone. We have provided all the tools needed to
              improve your TCL lifestyle. Take contol of your financial growth.
            </Text>

            <Text
              variant="title"
              marginTop="m"
              color="black"
              fontSize={24}
              lineHeight={35}
            >
              Quick, secure and easy loan application
            </Text>

            <Text marginTop="m" color="secondaryText" lineHeight={23}>
              With Leya, you can apply for loans, upload your documents and get
              faster payout once verification is done.
            </Text>

            <Text
              variant="title"
              marginTop="m"
              color="black"
              fontSize={24}
              lineHeight={35}
            >
              Make deposits and withdrawals
            </Text>

            <Text marginTop="m" color="secondaryText" lineHeight={23}>
              Leya allows you to initiate a new investment deposit, top-up and
              make withdrawals at maturity directly to your bank.
            </Text>

            <Text
              variant="title"
              marginTop="m"
              color="black"
              fontSize={24}
              lineHeight={35}
            >
              Loan calculator and tenor information
            </Text>

            <Text marginTop="m" color="secondaryText" lineHeight={23}>
              With Leya, when you want to apply for a loan, you can use the
              calculator to understand your repayment amounts for your preferred
              tenor.
            </Text>
          </Box>

          <Box
            paddingHorizontal="m"
            paddingVertical="l"
            justifyContent="center"
          ></Box>
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
    alignItems: "center",
    justifyContent: "center",
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

export default connect(mapStateToProps, { RequestLoan })(About);
