import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR } from '../helpers/Colors';

const PBSCTextField = (props) => {
  const {
    id,
    label,
    value,
    placeholder,
    password,
    hasError = false,
    helperText,
    keyboardType = 'default',
    autoCapitalize,
    autoComplete,
    onChangeText,
    onSubmitEditing,
    onBlur,
    onFocus,
    disabled = false,
    editable = true,
    maxLength,
    multiLine = false,
    width = ' 80%',
    height = 48,
    activeColor = COLOR.GRAY_LIGHT,
    inactiveColor = COLOR.GRAY_LIGHT,
    backgroundColor = COLOR.WHITE,
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
        theme={{ colors: { text: disabled ? COLOR.GRAY_MEDIUM : COLOR.BLACK } }}
      />
      <HelperText
        type={hasError ? 'error' : 'info'}
        visible={helperText}
        style={{ marginStart: -14, ...helperTextStyle }}
      >
        {helperText}
      </HelperText>
    </View>
  );
};

export default PBSCTextField;
