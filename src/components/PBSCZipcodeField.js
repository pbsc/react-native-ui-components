import React from 'react';

import { TextField } from '..';
import { COLOR } from '../helpers/Colors';

const PBSCZipcodeField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    locale = 'ca',
    hasError = false,
    errorColor = COLOR.RED,
    helperText,
    onChangeText = () => {},
    onSubmitEditing = () => {},
    onBlur = () => {},
    onFocus = () => {},
    disabled = false,
    editable = true,
    width = '80%',
    height = 48,
    activeColor = COLOR.GRAY_LIGHT,
    inactiveColor = COLOR.GRAY_LIGHT,
    backgroundColor = COLOR.WHITE,
    textColor = COLOR.BLACK,
    style,
    textInputStyle,
    helperTextStyle,
  } = props;

  const maxLength = locale.toLowerCase().substring(0, 2) === 'ca' ? 7 : 6;

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      placeholder={placeholder}
      hasError={hasError}
      errorColor={errorColor}
      helperText={helperText}
      autoCapitalize="characters"
      maxLength={maxLength}
      keyboard
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      editable={editable}
      width={width}
      height={height}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      backgroundColor={backgroundColor}
      textColor={textColor}
      style={style}
      textInputStyle={textInputStyle}
      helperTextStyle={helperTextStyle}
    />
  );
};

export default PBSCZipcodeField;
