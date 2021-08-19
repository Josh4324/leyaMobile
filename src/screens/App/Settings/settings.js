import React from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../components/safe-wrapper';
import { LogoutUser } from '../../../redux/Authentication/auth-actions';
import Theme, { Box, Text } from '../../../utils/theme';
import ScrollWrapper from '../../../components/scroll-wrapper';
import UserSVG from '../../../../assets/images/user.svg';

function Settings({ navigation, user, LogoutUser }) {
  const { navigate } = navigation;

  const onLogout = () => {
    Alert.alert('Alert', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => LogoutUser() },
    ]);
  };
  return (
    <Box flex={1} style={{ backgroundColor: '#F9F9F9' }}>
      <StatusBar
        backgroundColor={Theme.colors.inputBG}
        barStyle="dark-content"
      />
      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          flex={0.05}
          alignItems="center"
          paddingTop="xl"
          style={{ backgroundColor: '#F9F9F9' }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={28}
            />
          </TouchableOpacity>
          <Text marginLeft="xl" variant="medium" fontSize={16}>
            Account Settings
          </Text>
        </Box>

        <Box flex={0.98} paddingHorizontal="m">
          <ScrollWrapper>
            <Box marginTop="s">
              <Box style={styles.disclaimer}>
                <Box marginRight="m">
                  <UserSVG />
                </Box>
                <Box>
                  <Text
                    color="black"
                    variant="medium"
                    fontSize={16}
                    lineHeight={20}
                    marginBottom="s"
                  >
                    {user?.user?.firstName} {user?.user?.surame}
                  </Text>
                  <Text
                    color="black"
                    variant="body"
                    fontSize={15}
                    lineHeight={20}
                    marginBottom="s"
                  >
                    {user?.user?.userId}
                  </Text>
                  <Text
                    color="black"
                    variant="body"
                    fontSize={15}
                    lineHeight={20}
                  >
                    +{user?.customer?.mobileNo}
                  </Text>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate('UpdateInformation')}
                  >
                    <Text
                      variant="medium"
                      fontSize={14}
                      style={{ color: '#A87C00' }}
                    >
                      Update Information
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
            <Box marginTop="l">
              <Box
                style={styles.boxContainer}
                paddingHorizontal="m"
                justifyContent="center"
                flexDirection="row"
                marginBottom="l"
              >
                <Box flex={0.9} flexDirection="row" alignItems="center">
                  <Ionicons
                    name="eye-off-outline"
                    color={Theme.colors.white}
                    size={26}
                  />
                  <Text variant="medium" color="white" marginLeft="l">
                    Show/Hide Balance
                  </Text>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Ionicons
                    name="eye-off-outline"
                    color={Theme.colors.white}
                    size={26}
                  />
                </Box>
              </Box>

              <Box
                style={styles.boxContainer}
                paddingHorizontal="m"
                justifyContent="center"
                flexDirection="row"
                marginBottom="l"
              >
                <Box flex={0.9} flexDirection="row" alignItems="center">
                  <Ionicons
                    name="lock-closed"
                    color={Theme.colors.white}
                    size={26}
                  />
                  <Text variant="medium" color="white" marginLeft="l">
                    Security
                  </Text>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Ionicons
                    name="chevron-forward-outline"
                    color={Theme.colors.greenPrimary}
                    size={16}
                  />
                </Box>
              </Box>

              <Box
                style={styles.boxContainer}
                paddingHorizontal="m"
                justifyContent="center"
                flexDirection="row"
                marginBottom="l"
              >
                <Box flex={0.9} flexDirection="row" alignItems="center">
                  <Ionicons
                    name="help-circle-outline"
                    color={Theme.colors.white}
                    size={26}
                  />
                  <Text variant="medium" color="white" marginLeft="l">
                    Frequently Asked Questions
                  </Text>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Ionicons
                    name="chevron-forward-outline"
                    color={Theme.colors.greenPrimary}
                    size={16}
                  />
                </Box>
              </Box>

              <Box
                style={styles.boxContainer}
                paddingHorizontal="m"
                justifyContent="center"
                flexDirection="row"
                marginBottom="l"
              >
                <Box flex={0.9} flexDirection="row" alignItems="center">
                  <Ionicons
                    name="call-outline"
                    color={Theme.colors.white}
                    size={26}
                  />
                  <Text variant="medium" color="white" marginLeft="l">
                    Call Help line (+2349053702388)
                  </Text>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Ionicons
                    name="chevron-forward-outline"
                    color={Theme.colors.greenPrimary}
                    size={16}
                  />
                </Box>
              </Box>

              <Box
                style={styles.boxContainer}
                paddingHorizontal="m"
                justifyContent="center"
                flexDirection="row"
                marginBottom="l"
                backgroundColor="red"
              >
                <Box flex={0.9} flexDirection="row" alignItems="center">
                  <Ionicons
                    name="information-circle-outline"
                    color={Theme.colors.white}
                    size={26}
                  />
                  <Text variant="medium" color="white" marginLeft="l">
                    About Leya
                  </Text>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Ionicons
                    name="chevron-forward-outline"
                    color={Theme.colors.greenPrimary}
                    size={16}
                  />
                </Box>
              </Box>

              <TouchableOpacity onPress={() => onLogout()}>
                <Box
                  style={styles.redContainer}
                  paddingHorizontal="m"
                  justifyContent="center"
                  flexDirection="row"
                  marginBottom="l"
                >
                  <Box flex={0.9} flexDirection="row" alignItems="center">
                    <Ionicons
                      name="log-out-outline"
                      color={Theme.colors.white}
                      size={26}
                    />
                    <Text variant="medium" color="white" marginLeft="l">
                      Logout
                    </Text>
                  </Box>
                  <Box flexDirection="row" alignItems="center">
                    <Ionicons
                      name="chevron-forward-outline"
                      color={Theme.colors.white}
                      size={16}
                    />
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
          </ScrollWrapper>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  disclaimer: {
    flexDirection: 'row',
    // minHeight: moderateScale('100'),
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    backgroundColor: Theme.colors.greenOpacity,
    borderRadius: Theme.borderRadii.m,
    padding: Theme.spacing.m,
  },
  boxContainer: {
    height: 60,
    backgroundColor: Theme.colors.black,
    borderRadius: Theme.borderRadii.m,
  },
  redContainer: {
    height: 60,
    backgroundColor: Theme.colors.red,
    borderRadius: Theme.borderRadii.m,
  },
  button: {
    backgroundColor: 'rgba(225,202,51,.2)',
    padding: Theme.spacing.s,
    borderRadius: Theme.borderRadii.s,
    marginTop: Theme.spacing.s,
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { LogoutUser })(Settings);
