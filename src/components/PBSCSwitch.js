import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR } from '../constants/Colors';

const PBSCSwitch = (props) => {
  const {
    id,
    label,
    isOn,
    onChange,
    disabled = false,
    size = 36,
    onColor = COLOR.PURPLE_LIGHT,
    offColor = COLOR.GRAY_PALE,
    wheelColor = COLOR.WHITE,
    textColor = COLOR.BLACK,
    iconForOn = 'checkmark-sharp',
    iconForOff = 'close',
    style,
    textStyle,
  } = props;

  const progress = useDerivedValue(() => {
    return withTiming(isOn ? 1 : 0);
  });

  const animatedMarginStyle = useAnimatedStyle(() => {
    const marginLeft = interpolate(
      progress.value,
      [0, 1],
      [2, (size * 2) / 3 + 3]
    );
    return { marginLeft };
  });

  const animatedColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        disabled ? COLOR.DISABLED : offColor,
        disabled ? COLOR.DISABLED : onColor,
      ]
    );
    return { backgroundColor };
  });

  const onSwitchPress = () => {
    onChange(!isOn);
  };

  return (
    <View style={styles.container}>
      <Pressable id={id} disabled={disabled} onPress={onSwitchPress}>
        <Animated.View
          style={[
            {
              width: (size * 5) / 3,
              height: size,
              borderRadius: size / 2,
              justifyContent: 'center',
            },
            style,
            animatedColorStyle,
          ]}
        >
          <Animated.View
            style={[
              styles.toggleWheelStyle,
              {
                width: size - 5,
                height: size - 5,
                backgroundColor: disabled ? COLOR.WHITE : wheelColor,
                borderRadius: (size - 5) / 2,
              },
              animatedMarginStyle,
            ]}
          >
            {isOn ? (
              <WheelIcon name={iconForOn} size={size} disabled={disabled} />
            ) : (
              <WheelIcon name={iconForOff} size={size} disabled={disabled} />
            )}
          </Animated.View>
        </Animated.View>
      </Pressable>
      <Text
        style={{
          marginStart: 10,
          fontSize: 16,
          color: disabled ? COLOR.DISABLED : textColor,
          ...textStyle,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const WheelIcon = ({ name, size, disabled }) => {
  return (
    <Icon
      name={name}
      size={(size * 2) / 3}
      style={{
        position: 'absolute',
        left: size / 6 - 2,
        top: size / 8 - 2,
      }}
      color={disabled ? COLOR.DISABLED : COLOR.BLACK}
    />
  );
};

export default PBSCSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  toggleWheelStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
