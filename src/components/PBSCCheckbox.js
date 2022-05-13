import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HelperText } from 'react-native-paper';

import { COLOR } from '../constants/Colors';

const PBSCCheckbox = (props) => {
  const {
    id,
    label,
    checked = false,
    onChange,
    helperText,
    disabled = false,
    size = 32,
    borderWidth = 2,
    borderColor = COLOR.PURPLE_LIGHT,
    backgroundColorUnchecked = COLOR.GRAY_PALE,
    backgroundColorChecked = COLOR.PURPLE_LIGHT,
    checkmarkColor = COLOR.WHITE,
    labelColor = COLOR.BLACK,
    style,
    labelStyle,
    helperTextStyle,
  } = props;

  const onCheckmarkPress = () => {
    onChange(!checked);
  };

  const checkboxBaseStyle = {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: borderWidth,
    borderColor: disabled ? COLOR.DISABLED : borderColor,
    backgroundColor: backgroundColorUnchecked,
  };

  const checkboxCheckedStyle = {
    backgroundColor: disabled ? COLOR.DISABLED : backgroundColorChecked,
  };

  return (
    <View style={{ width: '80%', ...style }}>
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
              color={disabled ? COLOR.WHITE : checkmarkColor}
              style={{
                position: 'absolute',
                left: (-1 * size) / 16,
                top: (-1 * size) / 16,
              }}
            />
          )}
        </Pressable>
        <Text
          style={{
            marginStart: 10,
            fontSize: 16,
            color: disabled ? COLOR.DISABLED : labelColor,
            ...labelStyle,
          }}
        >
          {label}
        </Text>
      </View>
      <HelperText
        type="info"
        visible={helperText}
        style={{ marginStart: size - 2, ...helperTextStyle }}
      >
        {helperText}
      </HelperText>
    </View>
  );
};

export default PBSCCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
});
