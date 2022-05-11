import * as React from 'react';
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
  const handleChange = (value) => {
    console.log(`Text input: ${value}`);
  };

  const handleSubmit = (value) => {
    console.log(`Text submitted: ${value.nativeEvent.text}`);
  };

  return (
    <View style={styles.container}>
      <Checkbox />
      <DateTimePicker />
      <Dropdown />
      <StrengthIndicator />
      <Switch />
      <TextField label="Multiline Text field" multiLine />
      <TextField
        label="Email"
        placeholder="Your email address"
        keyboardType="email-address"
        autoCapitalize="none"
        helperText="Helper text"
        onChangeText={handleChange}
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
