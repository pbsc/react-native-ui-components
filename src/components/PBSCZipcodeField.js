import React, { useState } from 'react';

import { TextField } from '..';
import { COLOR } from '../helpers/Colors';
import '../helpers/RegexService';
import { PostalcodeRegex } from '../helpers/PostalcodeRegex';

const PBSCZipcodeField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    country = 'CA',
    hasError = false,
    errorColor = COLOR.PBSC_RED,
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
  const handleChangeText = (value) => {
    const capitalizedText = value.toUpperCase();
    setControlledText(capitalizedText);
    onChangeText(capitalizedText);
  };

  const regexPatternForPostalCode = () => {
    const postRegex = PostalcodeRegex.find(
      (x) => x.abbrev === country.toUpperCase()
    ).postal;
    if (postRegex != undefined) {
      const regex = new RegExp(postRegex);
      return regex.toPartialMatchRegex();
    } else {
      return '';
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      value={controlledText}
      placeholder={placeholder}
      inputPattern={regexPatternForPostalCode()}
      hasError={hasError}
      errorColor={errorColor}
      helperText={helperText}
      autoCapitalize="characters"
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
