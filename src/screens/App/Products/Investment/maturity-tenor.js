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
export default function MaturityTenor({ navigation }) {
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
          Investment Request
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
            backgroundColor="greenPrimary"
            justifyContent="center"
            alignItems="flex-start"
            paddingHorizontal="m"
          >
            <Text variant="title" fontSize={32} lineHeight={35}>
              What is your proposed tenor?
            </Text>
          </Box>

          <Box flex={0.4}>
            <Box paddingHorizontal="m" paddingVertical="m">
              <Text variant="body" color="black">
                Select your preferred tenor
              </Text>

              <Box style={styles.selectionBox}>
                <Box>
                  <Text color="white">3 Months</Text>
                </Box>

                <Box flexDirection="row">
                  <TouchableOpacity
                    style={[styles.iconBox, { marginRight: 15 }]}
                  >
                    <Box>
                      <Ionicons
                        name="add-outline"
                        size={20}
                        color={Theme.colors.dark}
                      />
                    </Box>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconBox}>
                    <Box>
                      <Ionicons
                        name="remove-outline"
                        size={20}
                        color={Theme.colors.dark}
                      />
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>

            <Box
              borderTopWidth={1}
              marginVertical="m"
              marginHorizontal="m"
              justifyContent="center"
              alignItems="center"
              style={{ borderTopColor: '#EAEAEA' }}
            >
              <Text style={{ marginTop: -8, backgroundColor: 'white' }}>
                OR
              </Text>
            </Box>

            <Box paddingHorizontal="m" paddingVertical="s">
              <Box style={styles.selectionBox}>
                <Box flexDirection="row" alignItems="center">
                  <TouchableOpacity
                    style={styles.checkBox}
                    onPress={() => setAgree(!agree)}
                  >
                    <Box style={styles.checkCircle}>
                      {agree && <Box style={styles.innerDot} />}
                    </Box>
                  </TouchableOpacity>
                  <Box>
                    <Text color="white">2 Years</Text>
                  </Box>
                </Box>

                <Box flexDirection="row">
                  <Text color="white">Maximum</Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            flex={0.4}
            paddingHorizontal="m"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              paddingHorizontal="m"
              marginTop="xxxl"
              style={styles.disclaimer}
            >
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
                  Please note that the investment window closes on the 7th of
                  each month
                </Text>
              </Box>
            </Box>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('InvestmentConfirmation')}
            >
              <Text color="white" variant="medium" fontSize={20}>
                Next
              </Text>
            </TouchableOpacity>
          </Box>
        </SafeWrapper>
      </Box>
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
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
  disclaimer: {
    flexDirection: 'row',
    minHeight: moderateScale(80),
    width: WIDTH - 55,
    borderWidth: 1,
    borderColor: 'rgba(0, 161, 52, 0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.colors.greenOpacity,
  },
});
