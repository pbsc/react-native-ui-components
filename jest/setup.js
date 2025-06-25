/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock react-native-date-picker
jest.mock('react-native-date-picker', () => {
  const React = require('react');
  const { View } = require('react-native');

  return React.forwardRef((props, ref) => {
    const { testID, onDateChange, date } = props;

    // Create a mock component that can be interacted with in tests
    const handleDateChange = (newDate) => {
      if (onDateChange) {
        onDateChange(newDate);
      }
    };

    return React.createElement(View, {
      testID: testID,
      ref: ref,
      onDateChange: handleDateChange,
      date: date,
    });
  });
});
