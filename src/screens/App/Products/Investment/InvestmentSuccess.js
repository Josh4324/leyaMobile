import React, { useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Theme, { Box, Text } from '../../../../utils/theme';
import SuccessSVG from '../../../../../assets/images/success.svg';
import PatternSVG from '../../../../../assets/images/pattern.svg';
import SafeWrapper from '../../../../components/safe-wrapper';

import { connect } from 'react-redux';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

function InvestmentSuccess({ navigation, text, auth }) {
  const { width } = useWindowDimensions();
  const { navigate } = navigation;

  useEffect(() => {}, []);

  return (
    <Box style={styles.wrapper} flex={1} position="relative">
      <PatternSVG
        style={{
          position: 'absolute',
          width: width,
          resizeMode: 'cover',
        }}
      />
      <SafeWrapper>
        <Box flex={1} alignItems="center" justifyContent="space-between">
          <Box style={styles.imageBox} flex={0.4} justifyContent="flex-end">
            <SuccessSVG
              style={{ width: width * 0.92, resizeMode: 'contain' }}
            />
          </Box>

          <Box
            justifyContent="center"
            alignItems="center"
            flex={0.3}
            paddingHorizontal="m"
          >
            <Text color="white" variant="medium" fontSize={30}>
              Congratulations!
            </Text>
            <Text
              color="white"
              variant="body"
              fontSize={16}
              marginTop="m"
              textAlign="center"
            >
              Your request has been sent. Your account officer will contact you
              upon approval.
            </Text>
          </Box>
          <Box
            flex={0.3}
            paddingHorizontal="m"
            alignItems="center"
            justifyContent="center"
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('ActiveInvestment')}
            >
              <Text color="greenPrimary" variant="medium" fontSize={20}>
                Continue
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </SafeWrapper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(InvestmentSuccess);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#00A134',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageBox: {},
  button: {
    width: WIDTH - 55,
    height: 55,
    backgroundColor: Theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadii.s,
  },
});
