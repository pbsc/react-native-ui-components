import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Checkbox,
  Dropdown,
  Switch,
  TextField,
} from '@pbsc/react-native-ui-components';

export default function App() {
  return (
    <View style={styles.container}>
      <Checkbox />
      <Dropdown />
      <Switch />
      <TextField />
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
