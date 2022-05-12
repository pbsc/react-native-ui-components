import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR } from '../constants/Colors';

const PBSCCheckbox = (props) => {
  const {
    id,
    label,
    checked = false,
    onChange,
    disabled = false,
    size = 32,
    borderWidth = 2,
    borderColor = COLOR.PURPLE_LIGHT,
    backgroundColorUnchecked = COLOR.GRAY_PALE,
    backgroundColorChecked = COLOR.PURPLE_LIGHT,
    disabledColor = COLOR.DISABLED,
    textColor = COLOR.BLACK,
    textStyle,
  } = props;

  const onCheckmarkPress = () => {
    onChange(!checked);
  };

  const iconSift = () => {
    return (-1 * size) / 16;
  };

  const checkboxBaseStyle = {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: borderWidth,
    borderColor: disabled ? disabledColor : borderColor,
    backgroundColor: backgroundColorUnchecked,
  };

  const checkboxCheckedStyle = {
    backgroundColor: disabled ? disabledColor : backgroundColorChecked,
  };

  return (
    <View style={styles.container}>
      <Pressable
        id={id}
        disabled={disabled}
        style={[checkboxBaseStyle, checked && checkboxCheckedStyle]}
        onPress={onCheckmarkPress}
      >
        {checked && (
          <Icon
            name="checkmark-sharp"
            size={size}
            color="white"
            style={{ position: 'absolute', left: iconSift(), top: iconSift() }}
          />
        )}
      </Pressable>
      <Text
        style={{
          marginStart: 10,
          fontSize: 16,
          color: disabled ? disabledColor : textColor,
          ...textStyle,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default PBSCCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
});