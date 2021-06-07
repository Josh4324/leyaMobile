import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';

import SafeWrapper from '../../components/safe-wrapper';
import Button from '../../components/button';
import Theme, { Box, Text } from '../../utils/theme';
import RegistrationHeader from '../../components/registration-header';
import KeyboardWrapper from '../../components/keyboard-wrapper';

const { width: WIDTH } = Dimensions.get('window');

export default function Verification({ navigation }) {
  const { navigate } = navigation;
  let textInput = useRef(null);
  const lengthInput = 5;

  const [internalVal, setInternalVal] = useState('');

  const onChangeText = (val) => {
    setInternalVal(val);
  };

  console.log('int: ', internalVal);

  useEffect(() => {
    textInput.focus();
  });

  return (
    <SafeWrapper propedStyles={{ backgroundColor: 'white' }}>
      <KeyboardWrapper>
        <Box paddingHorizontal="m" flex={0.2}>
          <RegistrationHeader
            activeStep="Step 2"
            activeTitle="Verify your account"
            inactiveStep="Step 3"
            inactiveTitle="Create a passcode"
            progress="60%"
          />
        </Box>

        <Box style={styles.formBox} flex={0.7} paddingHorizontal="m">
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              Verification Code
            </Text>

            <TextInput
              ref={(input) => (textInput = input)}
              style={{ width: 0, height: 0 }}
              keyboardType="numeric"
              returnKeyType="done"
              secureTextEntry={true}
              maxLength={lengthInput}
              value={internalVal}
              onChangeText={onChangeText}
            />
          </Box>

          <Box marginTop="xl" style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <Box
                  style={[
                    styles.cellView,
                    {
                      borderColor:
                        index === internalVal.length
                          ? '#00A134'
                          : 'rgba(218, 218, 218, 0.4)',
                    },
                  ]}
                  key={index}
                >
                  <Text
                    color="primaryText"
                    variant="medium"
                    fontSize={16}
                    onPress={() => {
                      textInput.focus();
                    }}
                  >
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </Box>
              ))}
          </Box>

          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginVertical="l"
          >
            <Text variant="body" fontSize={14} color="primaryText">
              Didn’t recieve the code?
            </Text>

            <Box>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="return-up-back-outline"
                  color={Theme.colors.greenPrimary}
                  size={28}
                />
                <Text
                  color="greenPrimary"
                  variant="medium"
                  fontSize={16}
                  marginLeft="s"
                >
                  Resend
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
        >
          <Button router={navigate} routeName="Passcode" text="Next" />
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cellView: {
    paddingVertical: 11,
    width: 60,
    height: 50,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Theme.borderRadii.s,
    backgroundColor: Theme.colors.inputBG,
    borderColor: 'rgba(218, 218, 218, 0.4)',
  },
});
