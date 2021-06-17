import React from 'react';
import { StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale } from 'react-native-size-matters';
import SafeWrapper from '../../../../components/safe-wrapper';
import Button from '../../../../components/button';
import Theme, { Box, Text } from '../../../../utils/theme';

export default function TrustFund({ navigation }) {
  const { navigate } = navigation;
  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <SafeWrapper propedStyles={{ flex: 1 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          flex={0.08}
          alignItems="center"
          borderBottomWidth={1}
          borderBottomColor="inputBG"
          backgroundColor="white"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={28}
            />
          </TouchableOpacity>
          <Text marginLeft="xxxl" variant="medium" fontSize={16}>
            Coming Soon
          </Text>
        </Box>

        <Box
          backgroundColor="greenPrimary"
          flex={0.5}
          paddingHorizontal="m"
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="smallHeading" fontSize={46} color="white">
            COMING SOON
          </Text>
        </Box>

        <Box flex={0.4} justifyContent="center" paddingHorizontal="m">
          <Text variant="smallHeading" fontSize={26} color="primaryText">
            Trust Funds
          </Text>
          <Text
            marginTop="m"
            variant="body"
            fontSize={15}
            lineHeight={23}
            color="secondaryText"
          >
            Our Trust Fund product is not accessible via the Leya app at this
            moment. However, If you are interested in this product, you can send
            us an email and we will be sure to respond within 24 hours.
          </Text>

          <Button
            text="Contact Us"
            propedStyles={{ marginTop: 30, alignSelf: 'center' }}
            router={navigate}
            routeName=""
          />
        </Box>
      </SafeWrapper>
    </Box>
  );
}
