import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeWrapper from "../../../components/safe-wrapper";
import Theme, { Box, Text } from "../../../utils/theme";
import ScrollWrapper from "../../../components/scroll-wrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Security({ navigation }) {
  const { navigate } = navigation;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const run = async () => {
      let current = await AsyncStorage.getItem("toggle");
      if (current === "true") {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    };

    run();
  }, []);

  const toggleSwitch = async () => {
    let key = String(!isEnabled);
    await AsyncStorage.setItem("toggle", key);
    if (key === "true") {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  return (
    <Box style={{ backgroundColor: "#F9F9F9" }} flex={1}>
      <StatusBar barStyle="dark-content" />
      <SafeWrapper propedStyles={{ flex: 0.06 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          alignItems="center"
          style={{ backgroundColor: "#F9F9F9" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={28}
            />
          </TouchableOpacity>
          <Text marginLeft="xxxl" variant="medium" fontSize={16}>
            Security
          </Text>
        </Box>
      </SafeWrapper>

      <Box
        flex={1}
        backgroundColor="greenOpacity"
        paddingHorizontal="m"
        paddingVertical="l"
      >
        <TouchableOpacity>
          <Box
            style={styles.boxContainer}
            paddingHorizontal="m"
            justifyContent="center"
            flexDirection="row"
            marginBottom="m"
          >
            <Box flex={0.9} flexDirection="row" alignItems="center">
              <Text variant="medium" color="white" marginLeft="s">
                Change your passcode
              </Text>
            </Box>
            <Box
              flex={0.1}
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Ionicons
                name="chevron-forward-outline"
                color={Theme.colors.greenPrimary}
                size={16}
              />
            </Box>
          </Box>
        </TouchableOpacity>

        <Box
          style={styles.boxContainer}
          paddingHorizontal="m"
          justifyContent="center"
          flexDirection="row"
          marginBottom="m"
        >
          <Box flex={0.9} flexDirection="row" alignItems="center">
            <Text variant="medium" color="white" marginLeft="s">
              Enable biometric verification
            </Text>
          </Box>
          <Box
            flex={0.1}
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Switch
              trackColor={{ false: "#767577", true: "#00A134" }}
              thumbColor={isEnabled ? "#E5F6EB" : "#f4f3f4"}
              ios_backgroundColor="rgba(143, 155, 179, 0.16);"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    height: 50,
    backgroundColor: Theme.colors.black,
    borderRadius: Theme.borderRadii.m,
  },
});
