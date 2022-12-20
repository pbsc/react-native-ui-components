import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLOR } from './Colors';

export const ModalButton = (props) => {
  const {
    testID,
    title,
    fontSize = 18,
    backgroundColor,
    textColor,
    onPress,
  } = props;

  return (
    <Pressable
      testID={testID}
      onPressOut={onPress}
      style={({ pressed }) => [{ backgroundColor: backgroundColor }]}
    >
      {({ pressed }) => (
        <Text style={styles.text(pressed, textColor, fontSize)}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: (isPressed, color, fontSize) => ({
    color: isPressed ? COLOR.GRAY_PALE : color,
    fontSize,
    padding: 8,
  }),
});
