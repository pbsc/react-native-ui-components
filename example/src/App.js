import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Checkbox,
  DateTimePicker,
  Dropdown,
  StrengthIndicator,
  Switch,
  TextField,
} from '@pbsc/react-native-ui-components';

export default function App() {
  const [checked, setChecked] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const handleCheckboxChanged = (value) => {
    setChecked(value);
    console.log(`Checked: ${value}`);
  };

  const handleToggleChange = (value) => {
    setIsOn(value);
    console.log(`IsOn: ${value}`);
  };

  const handleTextFieldChange = (value) => {
    console.log(`Text input: ${value}`);
  };

  const handleSubmit = (value) => {
    console.log(`Text submitted: ${value.nativeEvent.text}`);
  };

  return (
    <View style={styles.container}>
      <Checkbox
        label="Checkbox"
        checked={checked}
        onChange={handleCheckboxChanged}
      />
      <DateTimePicker />
      <Dropdown />
      <StrengthIndicator />
      <Switch label="Switch" isOn={isOn} onChange={handleToggleChange} />
      <TextField disabled label="Multiline Text field" multiLine />
      <TextField
        label="Email"
        placeholder="Your email address"
        keyboardType="email-address"
        autoCapitalize="none"
        helperText="Helper text"
        onChangeText={handleTextFieldChange}
        onSubmitEditing={handleSubmit}
      />
      <TextField
        label="Password"
        password={true}
        hasError={true}
        helperText="Invalid password!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
