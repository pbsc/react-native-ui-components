/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, Alert } from 'react-native';

import {
  Checkbox,
  DateTimePicker,
  Dropdown,
  StepIndicator,
  Switch,
  TextField,
  PhoneNumberField,
  ZipcodeField,
} from '@pbsc/react-native-ui-components';

import { PasswordStrength } from '../../../src/index';

import { checkPasswordStrength } from '../helpers/StrengthChecker';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [dateTimePickerSelectd, setDateTimePickerSelected] =
    useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [phoneNumber, setPhoneNumber] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [postalCode, setPostalCode] = useState('');
  const [passwordStrengthValue, setPasswordStrengthValue] = useState('');
  const [passwordStrengthValidation, setPasswordStrengthValidation] = useState(
    {}
  );

  const dropdownItems = [
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
    console.log(`Text submitted: ${value}`);
  };

  const textBeforeStartForStepIndicator = 'This is 0th step';
  const stepsForStepIndicator = [
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

  const handleDropdownSelect = (selectedItem) => {
    setDropdownSelected(selectedItem);
    console.log(`Dropdown selected: ${selectedItem.value}`);
  };

  const handleDateTimePickerConfirm = (selectedDateTime) => {
    setDateTimePickerSelected(selectedDateTime);
    console.log(`DatetimePicker confirmed: ${selectedDateTime}`);
  };

  const handlePhoneFieldSubmitEditting = (value) => {
    setPhoneNumber(value);
    console.log(`Phonenumber: ${value}`);
  };

  const prefiexesForPhoneNumber = [
    { label: '+1 🇨🇦', value: '+1' },
    { label: '+33 🇫🇷', value: '+33' },
    { label: '+44 🇬🇧', value: '+44' },
    { label: '+82 🇰🇷', value: '+82' },
    { label: '+672 🇳🇫', value: '+672' },
  ];

  const handlePostalcodeSubmit = (value) => {
    setPostalCode(value);
    console.log(`PostalCode: ${value}`);
  };

  const validateInputStrenghtApi = async (value) => {
    setPasswordStrengthValue(value);

    const passwordWeakness = checkPasswordStrength(value);

    setPasswordStrengthValidation(passwordWeakness);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 248,
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
          hasHelperTextIcon={true}
          disabled
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <TextField label="Password" password />
        <TextField
          label="Card number"
          rightIconName="credit-card-outline"
          keyboardType="number-pad"
        />
        <StepIndicator
          textBeforeStart={textBeforeStartForStepIndicator}
          steps={stepsForStepIndicator}
          currentStepIndex={2}
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <TextField
          label="Text field with error"
          hasError
          helperText="This is error text!"
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <TextField label="Multiline Text field" multiLine height={100} />
        <TextField
          label="Disabled Text field"
          value="This field is disabled."
          disabled
          helperText="This is helper text for disalbed text field"
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <DateTimePicker
          label="Birthday"
          labelWithFormat
          locale="en"
          mode="date"
          onConfirm={handleDateTimePickerConfirm}
          helperText="This is helper text for date picker"
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <Dropdown
          label="This is dropdown"
          items={dropdownItems}
          value={dropdownSelected}
          onSelect={handleDropdownSelect}
          helperText="This is helper text for dropdown"
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <PhoneNumberField
          label="Phone Number"
          prefixes={prefiexesForPhoneNumber}
          helperText="This is helper text for phone number field"
          onSubmitEditing={handlePhoneFieldSubmitEditting}
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <Checkbox
          label="This is Checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          helperText="This is helper text for checkbox."
          hasHelperTextIcon={true}
          helperTextStyle={{ marginStart: -10 }}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
          onLabelPress={() => Alert.alert('Checkbox label pressed')}
        />
        <Checkbox
          labelComponent={
            <Text style={styles.checkboxLabel}>
              This is Checkbox with
              <Text style={{ color: 'green' }}> Nested Custom Styled </Text>Text
            </Text>
          }
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <Switch
          label="This is Switch"
          isOn={isOn}
          onChange={handleSwitchChange}
          helperText="This is helper text for switch."
          hasHelperTextIcon={true}
          helperTextStyle={{ marginStart: -10 }}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <ZipcodeField
          label="Postal Code"
          country="CA"
          onSubmitEditing={handlePostalcodeSubmit}
          helperText="Please enter your postal code."
          hasHelperTextIcon={true}
          helperTextCustomIcon={
            <Image
              source={require('../images/info.png')}
              style={{ width: 12, height: 12 }}
            />
          }
        />
        <TextField
          label="Password Strenght Input"
          value={passwordStrengthValue}
          onChangeText={validateInputStrenghtApi}
        />
        <PasswordStrength
          value={passwordStrengthValue}
          isValid={() => {}}
          passwordStrengthValidation={passwordStrengthValidation}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  checkboxLabel: {
    marginStart: 10,
  },
});
