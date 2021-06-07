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

export default function PasscodeConfirmation({ navigation }) {
  const { navigate } = navigation;
  let textInput = useRef(null);
  const lengthInput = 6;

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
            activeStep="Final Step"
            activeTitle="Confirm your passcode"
            progress="100%"
          />
        </Box>

        <Box style={styles.formBox} flex={0.7} paddingHorizontal="m">
          <Box style={styles.formGroup}>
            <Text variant="medium" color="primaryText" fontSize={22}>
              Confirm your passcode
            </Text>

            <TextInput
              ref={(input) => (textInput = input)}
              style={{ width: 0, height: 0 }}
              keyboardType="numeric"
              returnKeyType="done"
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
                          ? '#FFCA33'
                          : 'rgba(218, 218, 218, 0.4)',
                      backgroundColor:
                        internalVal[index] > 0
                          ? '#FFCA33'
                          : 'rgba(218, 218, 218, 0.4)',
                    },
                  ]}
                  key={index}
                >
                  {/* <Text
                    color="gold"
                    variant="medium"
                    fontSize={18}
                    textAlign="center"
                    onPress={() => {
                      textInput.focus();
                    }}
                  >
                    {internalVal && internalVal.length > 0 ? '•' : ''}
                  </Text> */}
                </Box>
              ))}
          </Box>

          <Box paddingHorizontal="m" marginTop="xxxl" style={styles.disclaimer}>
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
                Ensure your passcode is protected at all times, do not share
                this with anyone.
              </Text>
            </Box>
          </Box>
        </Box>

        <Box
          flex={0.1}
          paddingHorizontal="m"
          alignItems="center"
          justifyContent="center"
        >
          <Button router={navigate} routeName="Success" text="Next" />
        </Box>
      </KeyboardWrapper>
    </SafeWrapper>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cellView: {
    // paddingVertical: 11,
    width: 15,
    height: 15,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 100,
    backgroundColor: Theme.colors.inputBG,
    borderColor: 'rgba(218, 218, 218, 0.4)',
  },
  disclaimer: {
    flexDirection: 'row',
    minHeight: moderateScale(80),
    borderWidth: 1,
    borderColor: 'rgba(0, 161, 52, 0.6)',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.colors.greenOpacity,
  },
});
