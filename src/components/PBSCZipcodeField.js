import React, { useState } from 'react';

import { TextField } from '..';
import { COLOR } from '../helpers/Colors';

const PBSCZipcodeField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    country = 'CA',
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

  const [controlledText, setControlledText] = useState(value);
  const maxLength = country.toLowerCase().substring(0, 2) === 'ca' ? 7 : 6;

  const handleChangeText = (value) => {
    const capitalizedText = value.toUpperCase();
    setControlledText(capitalizedText);
    onChangeText(capitalizedText);
  };

  return (
    <TextField
      id={id}
      label={label}
      value={controlledText}
      placeholder={placeholder}
      hasError={hasError}
      errorColor={errorColor}
      helperText={helperText}
      autoCapitalize="characters"
      maxLength={maxLength}
      keyboard
      onChangeText={handleChangeText}
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
