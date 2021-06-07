import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import Theme, { Box, Text } from '../utils/theme';
import Slides from '../utils/slides';
import OnboardingItem from './onboarding-item';
import Paginator from './paginator';
import ModalWrapper from './modal-wrapper';
import AuthSheet from './auth-sheet';

export default function Onboarding({ navigation }) {
  const { navigate } = navigation;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < Slides.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log('Last one');
    }
  };

  const scrollPrev = () => {
    if (currentIndex < Slides.length + 1) {
      slideRef.current.scrollToIndex({ index: currentIndex - 1 });
    } else {
      console.log('Last one');
    }
  };

  useEffect(() => {
    return () => {
      setModalVisible(false);
      console.log(modalVisible);
    };
  }, []);

  return (
    <Box flex={0.95}>
      <Box flex={3}>
        <FlatList
          data={Slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </Box>

      <Box
        justifyContent="space-between"
        flexDirection="row"
        paddingHorizontal="m"
        alignItems="center"
      >
        <Box>
          <TouchableOpacity onPress={scrollPrev}>
            {currentIndex > 0 && (
              <Box>
                <Text variant="smallHeading" color="greenPrimary" size={18}>
                  Prev
                </Text>
              </Box>
            )}
          </TouchableOpacity>
        </Box>

        <Box>
          <Paginator data={Slides} scrollX={scrollX} />
        </Box>

        {currentIndex === Slides.length - 1 ? (
          <Box>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Box>
                <Ionicons
                  name="arrow-forward-outline"
                  size={28}
                  color={Theme.colors.white}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        ) : (
          <Box>
            <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
              <Box>
                <Ionicons
                  name="arrow-forward-outline"
                  size={28}
                  color={Theme.colors.white}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        )}
      </Box>
      {modalVisible && (
        <ModalWrapper
          toggle={setModalVisible}
          show={modalVisible}
          propedStyle={{ backgroundColor: 'rgba(0,0,0,.3)' }}
          tap2close={true}
        >
          <AuthSheet router={navigate} toggle={setModalVisible} />
        </ModalWrapper>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    height: 64,
    width: 64,
    borderRadius: Theme.borderRadii.xl,
    backgroundColor: Theme.colors.greenPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
