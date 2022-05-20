import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Checkbox,
  DateTimePicker,
  Dropdown,
  StepIndicator,
  Switch,
  TextField,
} from '@pbsc/react-native-ui-components';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState(undefined);
  const [dateTimePickerSelectd, setDateTimePickerSelected] =
    useState(undefined);

  const dropdownData = [
    {
      label: 'One - This is very very very very very very long selection',
      value: '1',
    },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ];

  const handleTextFieldChange = (value) => {
    setText(value);
    console.log(`Text input: ${value}`);
  };

  const handleSubmit = (value) => {
    console.log(`Text submitted: ${value.nativeEvent.text}`);
  };

  const stepsForStepIndicator = [
    { text: 'This is 0th step' },
    { color: '#dd2618', text: 'This is 1st step' },
    { color: '#fea112', text: 'This is 2nd step' },
    { color: '#76bc23', text: 'This is 3rd step' },
    { color: '#349822', text: 'This is 4th step' },
    { color: '#297d19', text: 'This is 5th step' },
  ];

  const handleCheckboxChange = (value) => {
    setChecked(value);
    console.log(`Checked: ${value}`);
  };

  const handleSwitchChange = (value) => {
    setIsOn(value);
    console.log(`IsOn: ${value}`);
  };

  const handleDropdownSelect = (value) => {
    setDropdownSelected(value);
    console.log(`Dropdown selected: ${value.value}`);
  };

  const handleDateTimePickerConfirm = (value) => {
    setDateTimePickerSelected(value);
    console.log(`DatetimePicker confirmed: ${value}`);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 48,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          label="Email with help text"
          placeholder="Placeholder - Your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          helperText="This is helper text."
          value={text}
          onChangeText={handleTextFieldChange}
          onSubmitEditing={handleSubmit}
        />
        <TextField label="Password" password />
        <StepIndicator steps={stepsForStepIndicator} currentStepIndex={2} />
        <TextField
          label="Text field with error"
          hasError
          helperText="This is error text!"
        />
        <TextField label="Multiline Text field" multiLine fieldHeight={100} />
        <TextField
          label="Disabled Text field"
          value="This field is disabled."
          disabled
        />
        <Checkbox
          label="This is Checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          helperText="This is helper text for checkbox."
        />
        <Switch
          label="This is Switch"
          isOn={isOn}
          onChange={handleSwitchChange}
          helperText="This is helper text for switch."
        />
        <Dropdown
          label="This is dropdown"
          data={dropdownData}
          value={dropdownSelected}
          onSelect={handleDropdownSelect}
          helperText="This is helper text for dropdown"
          isStatusbarTranslucent={true}
        />
        <DateTimePicker
          label="Birthday"
          labelWithFormat
          locale="en"
          mode="date"
          onConfirm={handleDateTimePickerConfirm}
          helperText="This is helper text for date picker"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
