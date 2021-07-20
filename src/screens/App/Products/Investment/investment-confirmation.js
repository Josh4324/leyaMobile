import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../../utils/theme';

const { width: WIDTH } = Dimensions.get('window');
export default function InvestmentConfirmation({ navigation }) {
  const [tenor, setTenor] = useState('');
  const [agree, setAgree] = useState(false);
  const { navigate } = navigation;

  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <Box
        flexDirection="row"
        paddingHorizontal="m"
        flex={0.1}
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="flex-end"
        paddingVertical="m"
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

      <Box flex={0.9}>
        <SafeWrapper>
          <Box
            flex={0.2}
            backgroundColor="white"
            justifyContent="center"
            alignItems="flex-start"
            paddingHorizontal="m"
            paddingVertical="l"
          >
            <Text variant="title" color="black" fontSize={32} lineHeight={35}>
              Let’s go over your top-up request
            </Text>

            <Text marginTop="m" color="secondaryText" lineHeight={23}>
              Confirm the details below are accurate and an email will
              automatically be sent to your account officer to inform them of
              your request.
            </Text>
          </Box>

          <Box
            flex={0.4}
            paddingHorizontal="m"
            paddingVertical="l"
            justifyContent="center"
          >
            <Text>Top-up Request Details:</Text>

            <Box flex={0.6} paddingHorizontal="m">
              <Box style={styles.details} padding="m">
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>Proposed Amount:</Text>
                  <Box>
                    <Text color="black" variant="medium">
                      ₦1,000,000
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
                    2 Years
                  </Text>
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('InvestmentSuccess')}
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
              onPress={() => navigate('Investment')}
            >
              <Text color="white" variant="medium" fontSize={20}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Box>
        </SafeWrapper>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  button: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },

  details: {
    height: moderateScale(100),
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    borderRadius: 10,
    marginTop: Theme.spacing.l,
    backgroundColor: 'white',
  },
});
