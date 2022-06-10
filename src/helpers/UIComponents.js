import React from 'react';
import { Pressable, Text } from 'react-native';
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
        <Text
          style={[
            { color: pressed ? COLOR.GRAY_PALE : textColor },
            {
              fontSize: fontSize,
              padding: 8,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};
