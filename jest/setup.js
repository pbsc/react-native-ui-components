/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const RN = require('react-native');

  const mockValue = (initialValue) => ({
    value: initialValue,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
  });

  return {
    __esModule: true,
    default: {
      createAnimatedComponent: jest.fn((Component) => Component),
      call: () => {},
      View: RN.View,
      Text: RN.Text,
      Image: RN.Image,
      ScrollView: RN.ScrollView,
    },
    createAnimatedComponent: jest.fn((Component) => Component),
    useSharedValue: jest.fn((initialValue) => mockValue(initialValue)),
    useDerivedValue: jest.fn(() => mockValue(0)),
    useAnimatedStyle: jest.fn(() => ({})),
    interpolate: jest.fn(),
    interpolateColor: jest.fn(),
    withTiming: jest.fn((toValue) => toValue),
    withSpring: jest.fn((toValue) => toValue),
    Extrapolate: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
  };
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
