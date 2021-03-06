import React, { useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from '../utils/theme';

export default function ModalWapper({
  show,
  toggle,
  children,
  propedStyle,
  tap2close,
}) {
  const modalVisible = () => {
    toggle(show);
  };

  console.log('Modal state:', show);

  useEffect(() => {
    show = false;
  }, [show]);

  return (
    <Box flex={1} position="absolute" top={0}>
      <Box>
        <Modal
          animationType="fade"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            modalVisible();
          }}
        >
          <TouchableOpacity
            style={[styles.centeredView, propedStyle]}
            activeOpacity={1}
            onPressOut={tap2close ? () => modalVisible() : null}
          >
            {children}
          </TouchableOpacity>
        </Modal>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
});
