import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR, helperTextColor } from '../helpers/Colors';

const PBSCTextField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    password,
    inputPattern = '',
    rightIconName, // material community icon
    customIcon,
    onPressRightIcon,
    hasError = false,
    errorColor = COLOR.PBSC_RED,
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
    width = '80%',
    height = 48,
    activeColor = COLOR.GRAY_LIGHT,
    inactiveColor = COLOR.GRAY_LIGHT,
    backgroundColor = COLOR.WHITE,
    textColor = COLOR.BLACK,
    style,
    textInputStyle,
    helperTextStyle,
    hasHelperTextIcon = false,
    helperTextCustomIcon, // any svg icon component to show before helper text or error text goes here
  } = props;
  const [hideText, setHideText] = useState(true);
  const [controlledText, setControlledText] = useState(value ? value : '');

  const handleChangeText = (textValue) => {
    if (inputPattern === '') {
      setControlledText(textValue);
      onChangeText(textValue);
    } else {
      const matches = textValue.match(inputPattern);
      if (matches != null && matches.length > 0) {
        const matchedString = matches[0];
        if (textValue.length < controlledText.length) {
          setControlledText(textValue);
          onChangeText(textValue);
        } else if (matchedString.length > controlledText.length) {
          setControlledText(matchedString);
          onChangeText(matchedString);
        }
      }
    }
  };

  const handleOnSubmitEditing = (textValue) => {
    onSubmitEditing(textValue.nativeEvent.text);
  };

  const setRightIcon = () => {
    if (password === true) {
      return (
        <TextInput.Icon
          testID="textfield-righticon"
          name={hideText ? 'eye' : 'eye-off'}
          onPress={onPressEyeIcon}
          style={styles.rightIcon}
        />
      );
    } else if (rightIconName !== undefined && rightIconName.length > 0) {
      return (
        <TextInput.Icon
          name={rightIconName}
          disabled={typeof onPressRightIcon === 'function' ? false : true}
          onPress={onPressRightIcon}
          style={styles.rightIcon}
        />
      );
    } else if (customIcon) {
      return (
        <TextInput.Icon icon={() => customIcon()} style={styles.rightIcon} />
      );
    } else {
      return null;
    }
  };

  let secureTextEntry;
  if (password === true) {
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
        testID="textfield-input"
        mode="outlined"
        id={id}
        label={label}
        value={controlledText}
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
        keyboardType={password === true ? 'default' : keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        right={setRightIcon()}
        onChangeText={handleChangeText}
        onSubmitEditing={handleOnSubmitEditing}
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
      <View style={styles.helperTextContainer}>
        {hasHelperTextIcon && helperTextCustomIcon}
        <HelperText
          testID="textfield-helpertext"
          type={hasError ? 'error' : 'info'}
          visible={helperText}
          style={[
            styles.helperText(helperTextColor(hasError, disabled, errorColor)),
            helperTextStyle,
          ]}
        >
          {helperText}
        </HelperText>
      </View>
    </View>
  );
};

export default PBSCTextField;

const styles = StyleSheet.create({
  rightIcon: {
    marginTop: 16,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperText: (color) => ({
    marginStart: -10,
    color,
  }),
});
