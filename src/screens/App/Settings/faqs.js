import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transitioning, Transition } from 'react-native-reanimated';
import SafeWrapper from '../../../components/safe-wrapper';
import Theme, { Box, Text } from '../../../utils/theme';
import ScrollWrapper from '../../../components/scroll-wrapper';

import { sections } from '../../../utils/faqs';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);
export default function FAQS({ navigation }) {
  const { navigate } = navigation;
  const [section, setSection] = useState('investments');
  const [currentIndex, setCurrentIndex] = useState(null);

  const ref = useRef();

  const onSectionSelect = (selection) => {
    setSection(selection);
  };

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{ backgroundColor: 'white', flex: 1 }}
    >
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />

      <SafeWrapper propedStyles={{ flex: 0.07 }}>
        <Box
          flexDirection="row"
          paddingHorizontal="m"
          justifyContent="space-between"
          backgroundColor="white"
          alignItems="flex-end"
          alignContent="center"
          // paddingVertical="s"
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              color={Theme.colors.greenPrimary}
              size={24}
            />
          </TouchableOpacity>
          <Text variant="medium" fontSize={16}>
            FAQS
          </Text>

          <TouchableOpacity onPress={() => navigate('Settings')}>
            <Text variant="medium" fontSize={16} color="red">
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </SafeWrapper>

      <Box flex={1}>
        <Box
          flex={0.2}
          backgroundColor="greenPrimary"
          justifyContent="center"
          alignItems="flex-start"
          paddingHorizontal="m"
        >
          <Text variant="title" fontSize={26} lineHeight={35}>
            What can we help you with?
          </Text>
        </Box>

        <Box flex={0.8} backgroundColor="greenOpacity">
          <Box flexDirection="row" paddingHorizontal="m" paddingVertical="m">
            <ScrollView
              style={styles.scrollView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEventThrottle={32}
            >
              <TouchableOpacity onPress={() => onSectionSelect('investments')}>
                <Box
                  style={
                    section === 'investments' ? styles.pillActive : styles.pill
                  }
                >
                  <Text
                    style={
                      section === 'investments'
                        ? styles.pillActiveText
                        : styles.pillText
                    }
                  >
                    INVESTMENTS
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onSectionSelect('beans')}>
                <Box
                  style={section === 'beans' ? styles.pillActive : styles.pill}
                >
                  <Text
                    style={
                      section === 'beans'
                        ? styles.pillActiveText
                        : styles.pillText
                    }
                  >
                    BEANS
                  </Text>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onSectionSelect('gadgets')}>
                <Box
                  style={
                    section === 'gadgets' ? styles.pillActive : styles.pill
                  }
                >
                  <Text
                    style={
                      section === 'gadgets'
                        ? styles.pillActiveText
                        : styles.pillText
                    }
                  >
                    GADGET FINANCING
                  </Text>
                </Box>
              </TouchableOpacity>
            </ScrollView>
          </Box>

          <ScrollWrapper>
            {sections[section].map((section, index) => (
              <Box padding="s" key={index + 1}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.cardContainer}
                  onPress={() => {
                    ref.current.animateNextTransition();
                    setCurrentIndex(index === currentIndex ? null : index);
                  }}
                >
                  <Box
                    backgroundColor="white"
                    padding="m"
                    borderRadius="s"
                    style={styles.card}
                  >
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box flex={0.9}>
                        <Text
                          variant="medium"
                          lineHeight={20}
                          color="darkGreen"
                        >
                          {section.question}
                        </Text>
                      </Box>

                      <Box
                        flex={0.1}
                        justifyContent="center"
                        alignItems="flex-end"
                      >
                        <Ionicons
                          name="chevron-down-outline"
                          color={Theme.colors.greenPrimary}
                          size={20}
                        />
                      </Box>
                    </Box>

                    {index === currentIndex && (
                      <Box paddingTop="m">
                        <Text
                          variant="body"
                          fontSize={14}
                          lineHeight={20}
                          color="dark"
                        >
                          {section.answer}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </TouchableOpacity>
              </Box>
            ))}
          </ScrollWrapper>
        </Box>
      </Box>
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    borderRadius: Theme.borderRadii.l,
    padding: Theme.spacing.s,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  pillActive: {
    borderWidth: 1,
    borderColor: Theme.colors.greenPrimary,
    backgroundColor: Theme.colors.greenPrimary,
    borderRadius: Theme.borderRadii.l,
    padding: Theme.spacing.s,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  pillActiveText: {
    color: 'white',
  },
  pillText: {
    color: Theme.colors.secondaryText,
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
  },
});
