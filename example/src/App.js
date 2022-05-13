import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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

  const handleTextFieldChange = (value) => {
    console.log(`Text input: ${value}`);
  };

  const handleSubmit = (value) => {
    console.log(`Text submitted: ${value.nativeEvent.text}`);
  };

  const handleCheckboxChange = (value) => {
    setChecked(value);
    console.log(`Checked: ${value}`);
  };

  const handleSwitchChange = (value) => {
    setIsOn(value);
    console.log(`IsOn: ${value}`);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 48,
      }}
    >
      <View style={styles.container}>
        <TextField
          label="Email with help text"
          placeholder="Placeholder - Your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          helperText="This is helper text."
          onChangeText={handleTextFieldChange}
          onSubmitEditing={handleSubmit}
        />
        <TextField label="Password" password />
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
        <Dropdown />
        <DateTimePicker />
        <StrengthIndicator />
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
      </View>
    </ScrollView>
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
