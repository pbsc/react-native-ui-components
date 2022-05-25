import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR } from '../helpers/Colors';
import { helperTextColor } from '../helpers/HelperTextColor';

const PBSCTextField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    password,
    rightIconName, // material community icon
    onPressRightIcon,
    hasError = false,
    errorColor = COLOR.RED,
    helperText,
    keyboardType = 'default',
    autoCapitalize,
    autoComplete,
    onChangeText = () => {},
    onSubmitEditing = () => {},
    onBlur = () => {},
    onFocus = () => {},
    disabled = false,
    editable = true,
    maxLength,
    multiLine = false,
    width = ' 80%',
    height = 48,
    activeColor = COLOR.GRAY_LIGHT,
    inactiveColor = COLOR.GRAY_LIGHT,
    backgroundColor = COLOR.WHITE,
    textColor = COLOR.BLACK,
    style,
    textInputStyle,
    helperTextStyle,
  } = props;
  const [hideText, setHideText] = useState(true);

  const iconName = hideText ? 'eye' : 'eye-off';

  const setRightIcon = () => {
    if (password == true) {
      return (
        <TextInput.Icon
          name={iconName}
          onPress={onPressEyeIcon}
          style={{ marginTop: 16 }}
        />
      );
    } else if (rightIconName != undefined && rightIconName.length > 0) {
      return (
        <TextInput.Icon
          name={rightIconName}
          disabled={typeof onPressRightIcon === 'function' ? false : true}
          onPress={onPressRightIcon}
          style={{ marginTop: 16 }}
        />
      );
    } else {
      return null;
    }
  };

  let secureTextEntry;
  if (password == true) {
    secureTextEntry = hideText;
  } else {
    secureTextEntry = false;
  }

  const onPressEyeIcon = () => {
    setHideText(!hideText);
  };

  return (
    <View style={{ width: width, ...style }}>
      <TextInput
        mode="outlined"
        id={id}
        label={label}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        editable={editable}
        maxLength={maxLength}
        multiline={multiLine}
        outlineColor={inactiveColor}
        activeOutlineColor={activeColor}
        error={hasError}
        errorColor={errorColor}
        secureTextEntry={secureTextEntry}
        keyboardType={password == true ? 'default' : keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        right={setRightIcon()}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        onFocus={onFocus}
        style={{
          height: height,
          backgroundColor: backgroundColor,
          ...textInputStyle,
        }}
        theme={{
          colors: {
            text: disabled ? COLOR.GRAY_MEDIUM : textColor,
            error: errorColor,
          },
        }}
      />
      <HelperText
        type={hasError ? 'error' : 'info'}
        visible={helperText}
        style={{
          marginStart: -14,
          color: helperTextColor(hasError, disabled, errorColor),
          ...helperTextStyle,
        }}
      >
        {helperText}
      </HelperText>
    </View>
  );
};

export default PBSCTextField;
