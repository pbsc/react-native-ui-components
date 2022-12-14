import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { TextInput, Divider, HelperText } from 'react-native-paper';

import { Dropdown } from '..';
import { COLOR, helperTextColor } from '../helpers/Colors';
import { formatPhoneNumber } from '../helpers/PhoneNumberService';

const PBSCPhoneNumberField = (props) => {
  const {
    id,
    label,
    prefixes,
    onSelectPrefix = () => {},
    onChangeText = () => {},
    onSubmitEditing = () => {},
    disabled,
    width = '80%',
    height = 48,
    hasError = false,
    errorColor = COLOR.PBSC_RED,
    textColor = COLOR.BLACK,
    textSize = 16,
    helperText,
    style,
    prefixStyle,
    fieldStyle,
    helperTextStyle,
    hasHelperTextIcon = false,
    helperTextCustomIcon, // any svg icon component to show before helper text or error text goes here
  } = props;

  const windowWidth = Dimensions.get('window').width;
  const [numPrefix, setNumPrefix] = useState(1);
  const [prefixSelected, setPrefixSelected] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handlePrefixSelected = (selectedPrefix) => {
    setNumPrefix(selectedPrefix.value.length);
    setPrefixSelected(selectedPrefix.value);
    if (typeof onSelectPrefix === 'function') {
      onSelectPrefix(selectedPrefix);
    }
  };

  const handleOnFocus = () => {
    setIsActive(true);
  };

  const handleOnBlur = () => {
    setIsActive(false);
    handleSubmitEditing();
  };

  const handleSubmitEditing = () => {
    if (typeof onSubmitEditing === 'function') {
      onSubmitEditing(`${prefixSelected}-${phoneNumber}`);
    }
  };

  const dropdownWidth =
    60 + (10 * textSize) / 16 + (numPrefix * 10 * textSize) / 16;

  const textinputWidth = () => {
    if (typeof width === 'string') {
      if (width.endsWith('%')) {
        const convertedValue = width.substring(0, width.length - 1);
        if (!isNaN(convertedValue)) {
          return (
            (windowWidth * parseFloat(convertedValue)) / 100 - dropdownWidth
          );
        }
      }
    } else if (typeof width === 'number') {
      return width - dropdownWidth;
    }

    return windowWidth * 0.8 - dropdownWidth; // return default value (80%)
  };

  const handleChangeText = (value) => {
    const formatedPhoneNumber = formatPhoneNumber(value);
    setPhoneNumber(formatedPhoneNumber);
    onChangeText(value);
  };

  const dividerColor = disabled
    ? COLOR.DISABLED
    : hasError
    ? COLOR.PBSC_RED
    : COLOR.GRAY_LIGHT;

  return (
    <View
      style={{
        width: width,
        height: height,
        marginTop: 10,
        marginBottom: 30,
        ...style,
      }}
    >
      <View>
        <Dropdown
          items={prefixes}
          textAlignInItem="right"
          height={height}
          showValueWhenSelected={true}
          disabled={disabled}
          onSelect={handlePrefixSelected}
          borderColor={hasError ? COLOR.PBSC_RED : COLOR.GRAY_LIGHT}
          textColor={textColor}
          textSize={textSize}
          style={{
            marginTop: -6,
            marginBottom: -24,
            width: dropdownWidth,
            ...prefixStyle,
          }}
        />
        <View
          style={{
            width: textinputWidth(),
            position: 'absolute',
            left: dropdownWidth,
          }}
        >
          <TextInput
            testID="phonenumberfield-input"
            id={id}
            mode="outlined"
            label={label}
            disabled={disabled}
            editable={prefixSelected === '' ? false : true}
            keyboardType="phone-pad"
            error={hasError}
            outlineColor={COLOR.GRAY_LIGHT}
            activeOutlineColor={COLOR.GRAY_LIGHT}
            onChangeText={handleChangeText}
            value={phoneNumber}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            style={{
              marginTop: -6,
              height: height,
              backgroundColor: 'white',
              fontSize: textSize,
              ...fieldStyle,
            }}
            theme={{
              colors: {
                text: disabled ? COLOR.GRAY_MEDIUM : textColor,
                error: errorColor,
              },
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 10,
              left: -5,
              backgroundColor: 'white',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Divider
                style={{
                  height: 1,
                  width: 5,
                  backgroundColor: dividerColor,
                }}
              />
              <Divider
                style={{
                  height: isActive ? 2 : 1,
                  width: 6,
                  backgroundColor: dividerColor,
                }}
              />
            </View>
            <Divider
              style={{
                height: isActive ? height - 2 : height,
                width: isActive ? 2 : 1,
                backgroundColor: dividerColor,
                left: 5,
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Divider
                style={{
                  height: 1,
                  width: 5,
                  top: isActive ? 1 : 0,
                  backgroundColor: dividerColor,
                }}
              />
              <Divider
                style={{
                  height: isActive ? 2 : 1,
                  width: 6,
                  backgroundColor: dividerColor,
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {hasHelperTextIcon && helperTextCustomIcon}
        <HelperText
          testID="phonenumberfield-helpertext"
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

export default PBSCPhoneNumberField;
