import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput, HelperText } from 'react-native-paper';

import { COLOR } from '../helpers/Colors';
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

  const [selected, setSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(true);
  };

  const handleConfirm = (date) => {
    setIsOpen(false);
    setSelectedDate(date);
    setSelected(true);
    onConfirm(date);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  const dateTimeString = (date) => {
    if (mode === 'date') {
      return date.toLocaleDateString(locale);
    } else if (mode === 'time') {
      return date.toLocaleTimeString(locale);
    } else {
      return date.toLocaleString(locale);
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
            mode="outlined"
            id={id}
            label={makeLabel()}
            value={
              value
                ? value
                : selected
                ? dateTimeString(selectedDate)
                : undefined
            }
            disabled={disabled}
            editable={false}
            outlineColor={borderColor}
            selection={{ start: 0 }}
            error={hasError}
            style={{
              height: height,
              backgroundColor: backgroundColor,
              ...fieldStyle,
            }}
            theme={{
              colors: { text: disabled ? COLOR.GRAY_MEDIUM : COLOR.BLACK },
            }}
          />
        </View>
      </Pressable>
      <HelperText
        type={hasError ? 'error' : 'info'}
        visible={helperText}
        style={{ marginStart: -14, ...helperTextStyle }}
      >
        {helperText}
      </HelperText>
      <DatePicker
        androidVariant="iosClone"
        modal
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
        open={isOpen}
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default PBSCDateTimePicker;
