import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR, helperTextColor } from '../helpers/Colors';
import { ModalButton } from '../helpers/UIComponents';
import * as DateTimeService from '../helpers/DateTimeService';

const PBSCDateTimePicker = (props) => {
  const {
    id,
    label,
    labelWithFormat = false,
    value,
    onConfirm = () => {},
    onCancel = () => {},
    hasError = false,
    errorColor = COLOR.PBSC_RED,
    helperText,
    disabled = false,
    mode = 'date',
    maximumValue,
    minimumValue,
    minInterval,
    locale,
    pickerTitleText,
    confirmText,
    cancelText,
    pickerTextColor,
    is24hour,
    width = '80%',
    height = 48,
    backgroundColor = COLOR.WHITE,
    borderColor = COLOR.GRAY_LIGHT,
    style,
    fieldStyle,
    helperTextStyle,
  } = props;
  const windowSize = Dimensions.get('window');

  const [selectingDate, setSelectingDate] = useState(
    value ? value : new Date()
  );
  const [selectedDate, setSelectedDate] = useState(selectingDate);
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectingDate(date);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setSelectedDate(selectingDate);
    if (typeof onConfirm === 'function') {
      onConfirm(selectingDate);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectingDate(selectedDate);
    if (typeof onCancel === 'function') {
      onCancel(selectedDate);
    }
  };

  const dateTimeString = (date) => {
    if (typeof date === 'Date') {
      if (mode === 'date') {
        return date.toLocaleDateString(locale);
      } else if (mode === 'time') {
        return date.toLocaleTimeString(locale);
      } else {
        return date.toLocaleString(locale);
      }
    } else {
      return '';
    }
  };

  const makeLabel = () => {
    const formatString = DateTimeService.getDateTimePattern(mode, locale);
    if (label) {
      if (labelWithFormat) {
        return `${label} (${formatString})`;
      } else {
        return label;
      }
    } else {
      if (labelWithFormat) {
        return formatString;
      } else {
        return '';
      }
    }
  };

  return (
    <View style={{ width: width, ...style }}>
      <Pressable disabled={disabled} onPress={handlePress}>
        <View pointerEvents="none">
          <TextInput
            testID="datepicker-input"
            mode="outlined"
            id={id}
            label={makeLabel()}
            value={dateTimeString(selectingDate)}
            disabled={disabled}
            editable={false}
            outlineColor={borderColor}
            selection={{ start: 0 }}
            error={hasError}
            errorColor={errorColor}
            style={{
              height: height,
              backgroundColor: backgroundColor,
              ...fieldStyle,
            }}
            theme={{
              colors: {
                text: disabled ? COLOR.GRAY_MEDIUM : COLOR.BLACK,
                error: errorColor,
              },
            }}
          />
        </View>
      </Pressable>
      <HelperText
        testID="datepicker-helpertext"
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
      <Modal
        testID="datepicker-modal"
        visible={isOpen}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            flex: 1,
            justifyContent: 'center',
          }}
          onPress={handleCancel}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 36,
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowRadius: 4,
                shadowOffset: { height: 4, width: 0 },
                elevation: 4,
                shadowOpacity: 0.5,
                borderRadius: 12,
                padding: 12,
              }}
            >
              <DatePicker
                testID="datepicker-picker"
                androidVariant="iosClone"
                mode={mode}
                maximumDate={maximumValue}
                minimumDate={minimumValue}
                minuteInterval={minInterval}
                locale={locale}
                title={pickerTitleText}
                textColor={pickerTextColor}
                confirmText={confirmText}
                cancelText={cancelText}
                is24hourSource={is24hour}
                date={selectingDate}
                onDateChange={handleDateChange}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <ModalButton
                  testID="datepicker-cancel"
                  title="Cancel"
                  backgroundColor={COLOR.WHITE}
                  textColor={COLOR.PBSC_RED}
                  onPress={handleCancel}
                />
                <ModalButton
                  testID="datepicker-confirm"
                  title="Confirm"
                  backgroundColor={COLOR.WHITE}
                  textColor={COLOR.PBSC_BLUE}
                  onPress={handleConfirm}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PBSCDateTimePicker;
