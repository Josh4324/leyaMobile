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
export default function InvestmentRequest({ navigation }) {
  const { navigate } = navigation;
  const [amount, setAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  function formatCurrency(num) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(num);
  }
  return (
    <Box flex={1} backgroundColor="darkGreen">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <Box
        flexDirection="row"
        paddingHorizontal="m"
        flex={0.1}
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="flex-end"
        alignContent="center"
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
      <SafeWrapper propedStyles={{ flex: 1, justifyContent: 'space-between' }}>
        <Box paddingHorizontal="m" marginTop="l">
          <Text color="white" variant="medium" fontSize={26} lineHeight={36}>
            How much would you like to invest?
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
                Management Fee (0.5%):{' '}
              </Text>
              <Text color="white" fontSize={14} variant="body">
                {formatCurrency((amount * 0.5) / 100)}
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
              onPress={() => navigate('MaturityTenor')}
            >
              <Text color="greenPrimary" variant="medium" fontSize={20}>
                Continue
              </Text>
            </TouchableOpacity>
          )}
        </Box>
      </SafeWrapper>
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
    width: WIDTH - 55,
    height: 55,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
    alignSelf: 'center',
  },
});
