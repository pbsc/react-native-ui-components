import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR, helperTextColor } from '../helpers/Colors';

const PBSCTextField = (props) => {
  const {
    id,
    fieldRef,
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
    helperTextCustomIcon // any svg icon component to show before helper text or error text goes here
  } = props;
  const [hideText, setHideText] = useState(true);
  const [controlledText, setControlledText] = useState(value ? value : '');

  const handleChangeText = (value) => {
    if (inputPattern === '') {
      setControlledText(value);
      onChangeText(value);
    } else {
      const matches = value.match(inputPattern);
      if (matches != null && matches.length > 0) {
        const matchedString = matches[0];
        if (value.length < controlledText.length) {
          setControlledText(value);
          onChangeText(value);
        } else if (matchedString.length > controlledText.length) {
          setControlledText(matchedString);
          onChangeText(matchedString);
        }
      }
    }
  };

  const handleOnSubmitEditing = (value) => {
    onSubmitEditing(value.nativeEvent.text);
  };

  const setRightIcon = () => {
    if (password == true) {
      return (
        <TextInput.Icon
          testID="textfield-righticon"
          name={hideText ? 'eye' : 'eye-off'}
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
    } else if(customIcon) {
      return (<TextInput.Icon icon={() => customIcon()} style={{ marginTop: 16 }}/>)  ;
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
        testID="textfield-input"
        mode="outlined"
        id={id}
        ref={fieldRef}
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
        keyboardType={password == true ? 'default' : keyboardType}
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {hasHelperTextIcon && helperTextCustomIcon}
        <HelperText
          testID="textfield-helpertext"
          type={hasError ? 'error' : 'info'}
          visible={helperText}
          style={{
            marginStart: -10,
            color: helperTextColor(hasError, disabled, errorColor),
            ...helperTextStyle,
          }}
        >
        {helperText}
      </HelperText>
      </View>
    </View>
  );
};

export default PBSCTextField;
