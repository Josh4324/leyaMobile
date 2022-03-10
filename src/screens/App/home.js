import React, { useState, useEffect, Suspense } from "react";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SafeWrapper from "../../components/safe-wrapper";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import moment from "moment";
import Theme, { Box, Text } from "../../utils/theme";
import Pattern from "../../../assets/images/home-pattern.svg";
import { moderateScale } from "react-native-size-matters";
import { GetCustomerLoans } from "../../redux/Loans/loan-actions";
import {
  GetCustomerInvestments,
  MaskAmount,
} from "../../redux/Investments/investment-actions";

import AppHeader from "../../components/app-header";
import AccountCard from "../../components/account-card";
import EmptyState from "../../components/empty-state";

import "intl";
import "intl/locale-data/jsonp/en-NG";

if (Platform.OS === "android") {
  if (typeof Intl.__disableRegExpRestore === "function") {
    Intl.__disableRegExpRestore();
  }
}

function Home({
  navigation,
  user,
  loan,
  GetCustomerLoans,
  GetCustomerInvestments,
  investments,
  MaskAmount,
  mask,
  loading,
  investmentLoading,
}) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;
  const [investmentRoute, setInvestmentRoute] = useState("");
  const investment = investments[investments.length - 1];

  function formatCurrency(num) {
    return Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(num);
  }

  useEffect(() => {
    if (investments.length !== 0) {
      setInvestmentRoute("ActiveInvestment");
    } else {
      setInvestmentRoute("Investment");
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      let id = user?.customer.customerId;
      GetCustomerLoans(id);
      GetCustomerInvestments(id);
    }, [GetCustomerLoans, GetCustomerInvestments])
  );

  return (
    <Box flex={1}>
      <StatusBar backgroundColor="#00A134" barStyle="light-content" />
      <Box flex={0.5} backgroundColor="greenPrimary">
        <SafeWrapper propedStyles={{ position: "relative" }}>
          <Pattern
            width={width}
            style={{
              position: "absolute",
              resizeMode: "cover",
            }}
          />
          <AppHeader name={user?.user?.firstName} router={navigate} />
          <AccountCard router={navigate} masker={MaskAmount} mask={mask} />

          <Box
            flexDirection="row"
            justifyContent="center"
            style={{ marginBottom: moderateScale(15), paddingHorizontal: 20 }}
          >
            <TouchableOpacity
              style={[styles.actionButton, { marginRight: 28 }]}
              onPress={() => navigate(investmentRoute)}
            >
              <Text color="white" variant="medium" fontSize={16}>
                Add Funds
              </Text>
              <Box style={styles.iconBox}>
                <Ionicons
                  name="add-outline"
                  size={20}
                  color={Theme.colors.dark}
                />
              </Box>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton]}>
              <Text color="white" variant="medium" fontSize={16}>
                Withdraw
              </Text>
              <Box style={styles.iconBox}>
                <Ionicons
                  name="remove-outline"
                  size={20}
                  color={Theme.colors.dark}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </SafeWrapper>
      </Box>

      {loading ? (
        <Box
          flex={0.5}
          padding="m"
          backgroundColor="white"
          justifyContent="center"
        >
          <ActivityIndicator size="small" color="#00A134" />
          <Text color="greenPrimary" textAlign="center">
            Fetching activities...
          </Text>
        </Box>
      ) : Object.keys(loan).length === 0 ? (
        <EmptyState />
      ) : (
        <Suspense fallback={<ActivityIndicator size="small" color="#00A134" />}>
          <Box flex={0.5}>
            <Box
              padding="m"
              flex={0.1}
              backgroundColor="white"
              justifyContent="center"
            >
              <Text variant="medium" fontSize={18}>
                Activities
              </Text>
            </Box>
            <TouchableOpacity onPress={() => navigate("ActiveLoan")}>
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
                    {moment(loan?.creatDate).format("DD MMM YYYY")}
                  </Text>
                </Box>
                <Box>
                  <Text>{formatCurrency(loan.loanAmount)}</Text>
                </Box>
              </Box>
            </TouchableOpacity>

            {investment && (
              <TouchableOpacity onPress={() => navigate("ActiveInvestment")}>
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
                      Investment Request Submitted
                    </Text>
                    <Text variant="body" color="primaryText" fontSize={12}>
                      {moment(investment?.startDate).format("DD MMM YYYY")}
                    </Text>
                  </Box>
                  <Box>
                    <Text>{formatCurrency(investment?.amount)}</Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            )}
          </Box>
        </Suspense>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    width: moderateScale(150),
    backgroundColor: Theme.colors.dark,
    height: 60,
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  iconBox: {
    height: 24,
    width: 24,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  activityIcon: {
    height: 54,
    width: 54,
    marginLeft: 10,
    backgroundColor: Theme.colors.greenOpacity,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loan: state.loans.loan,
  investments: state.investments.investments,
  mask: state.investments?.masked,
  loading: state.loans.loading,
  investmentLoading: state.investments.loading,
});
export default connect(mapStateToProps, {
  GetCustomerLoans,
  GetCustomerInvestments,
  MaskAmount,
})(Home);
