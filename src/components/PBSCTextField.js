import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR } from '../constants/Colors';

const PBSCTextField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    password,
    disabled = false,
    editable = true,
    maxLength,
    multiLine = false,
    activeColor = COLOR.GRAY_LIGHT,
    inactiveColor = COLOR.GRAY_LIGHT,
    backgroundColor = COLOR.WHITE,
    hasError = false,
    helperText,
    keyboardType = 'default',
    autoCapitalize,
    autoComplete,
    onChangeText,
    onSubmitEditing,
    onBlur,
    onFocus,
    style,
    textInputStyle,
    helperTextStyle,
  } = props;
  const [hideText, setHideText] = useState(true);

  const iconName = hideText ? 'eye' : 'eye-off';

  const setRightIcon = () => {
    if (password == true) {
      return <TextInput.Icon name={iconName} onPress={onPressEyeIcon} />;
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
    <View style={{ width: '80%', ...style }}>
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
          height: 48,
          backgroundColor: backgroundColor,
          ...textInputStyle,
        }}
      />
      <HelperText
        type={hasError ? 'error' : 'info'}
        visible={helperText}
        style={helperTextStyle}
      >
        {helperText}
      </HelperText>
    </View>
  );
};

export default PBSCTextField;
