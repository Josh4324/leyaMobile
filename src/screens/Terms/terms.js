import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  View,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../components/safe-wrapper';
import Theme, { Box, Text } from '../../utils/theme';
import Logo from '../../../assets/images/logo.png';
import SwipeButton from '../../components/swipe-button';
import ModalWrapper from '../../components/modal-wrapper';
import TermsArticle from './terms-article';
import { backgroundColor } from '@shopify/restyle';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function Terms({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [agree, setAgree] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { navigate } = navigation;

  return (
    <Box flex={1} backgroundColor="white">
      <SafeWrapper>
        <Box flex={0.4}>
          <Box style={[styles.imageBox]}>
            <Image
              source={Logo}
              style={{
                width: width * 0.14,
                height: height / 8,
                resizeMode: 'contain',
              }}
            />
          </Box>

          <Box
            marginTop="s"
            paddingHorizontal="s"
            flexDirection="row"
            justifyContent="center"
          >
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => setAgree(!agree)}
            >
              <Box style={styles.checkCircle}>
                {agree && <Box style={styles.innerDot} />}
              </Box>
            </TouchableOpacity>
            <Text variant="body" fontSize={14} style={styles.checkText}>
              I want to apply & agree to all
            </Text>
          </Box>

          <Box marginTop="l" paddingHorizontal="l">
            <Box
              backgroundColor="greenOpacity"
              height={95}
              borderRadius="s"
              padding="m"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box flex={0.7} justifyContent="center">
                <Text
                  variant="body"
                  fontSize={14}
                  lineHeight={22}
                  color="greenPrimary"
                >
                  I want to apply & agree to the{' '}
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      fontSize={14}
                      lineHeight={22}
                      color="greenPrimary"
                      variant="medium"
                      textDecorationLine="underline"
                    >
                      Terms and Conditions
                    </Text>
                  </TouchableOpacity>
                </Text>
              </Box>

              <Box flex={0.3} justifyContent="center" alignItems="flex-end">
                <Ionicons
                  name="arrow-forward-outline"
                  size={28}
                  color={Theme.colors.greenPrimary}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box flex={0.6} paddingHorizontal="s" justifyContent="center">
          <Box marginTop="l" paddingHorizontal="l">
            <Text
              variant="body"
              fontSize={13}
              lineHeight={20}
              color="primaryText"
            >
              Leya is a portfolio management app which serves as your financial
              powerhouse and has been liscensed to give loans.
            </Text>
          </Box>

          <Box marginTop="l" paddingHorizontal="l">
            <Text
              variant="medium"
              fontSize={13}
              lineHeight={20}
              color="primaryText"
            >
              By swiping to continue, you consent and authorize us to obtain
              your credit report (required to be legible for an Loan) or other
              information to authenticate your account with us.
            </Text>
          </Box>

          <Box paddingHorizontal="s" alignItems="center" marginTop="l">
            {!agree ? (
              <Box style={[styles.swipeButton, { opacity: 0.3 }]}>
                <Box style={styles.swipeCircle}>
                  <AntDesign
                    name="doubleright"
                    size={22}
                    color={Theme.colors.greenPrimary}
                  />
                </Box>
                <Text
                  variant="medium"
                  textAlign="center"
                  fontSize={14}
                  color="white"
                  marginLeft="l"
                >
                  Swipe to agree & Continue
                </Text>
              </Box>
            ) : (
              <SwipeButton router={navigate} />
            )}
          </Box>

          {modalVisible && (
            <ModalWrapper
              toggle={setModalVisible}
              show={modalVisible}
              propedStyle={{ backgroundColor: 'rgba(255,255,255, 0.3)' }}
            >
              <TermsArticle
                router={navigate}
                toggle={setModalVisible}
                show={modalVisible}
              />
            </ModalWrapper>
          )}
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    height: 20,
    width: 20,
    borderRadius: Theme.borderRadii.l,
    borderColor: Theme.colors.greenPrimary,
    borderWidth: 1.5,
    marginRight: Theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    height: 12,
    width: 12,
    backgroundColor: Theme.colors.greenPrimary,
    borderRadius: Theme.borderRadii.l,
  },

  swipeButton: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.greenPrimary,
    borderRadius: 50,
    paddingHorizontal: Theme.spacing.s,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  swipeCircle: {
    width: 45,
    height: 45,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
