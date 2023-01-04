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
import { HelperText } from 'react-native-paper';

import { COLOR } from '../helpers/Colors';

const PBSCSwitch = (props) => {
  const {
    id,
    label,
    isOn = false,
    onChange = () => {},
    helperText,
    disabled = false,
    width = '80%',
    size = 36,
    labelColor = COLOR.BLACK,
    onColor = COLOR.PURPLE_LIGHT,
    offColor = COLOR.GRAY_PALE,
    wheelColor = COLOR.WHITE,
    iconForOn = 'checkmark-sharp',
    iconForOff = 'close',
    style,
    labelStyle,
    helperTextStyle,
    hasHelperTextIcon = false,
    helperTextCustomIcon, // any svg icon component to show before helper text or error text goes here
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
    return { marginLeft: marginLeft };
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
    return { backgroundColor: backgroundColor };
  });

  const animatedOnIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      opacity: opacity,
    };
  });

  const animatedOffIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [1, 0]);
    return {
      opacity: opacity,
    };
  });

  const onSwitchPress = () => {
    if (typeof onChange === 'function') {
      onChange(!isOn);
    }
  };

  return (
    <View style={{ width: width, ...style }}>
      <View style={styles.container}>
        <Pressable
          testID="switch-body"
          id={id}
          disabled={disabled}
          onPress={onSwitchPress}
        >
          <Animated.View
            style={[styles.animatedOuterContainer(size), animatedColorStyle]}
          >
            <Animated.View
              testID={isOn ? 'switch-wheel-on' : 'switch-wheel-off'}
              style={[
                styles.toggleWheelStyle,
                styles.animatedInnerContainer(size, disabled, wheelColor),
                animatedMarginStyle,
              ]}
            >
              <Animated.View style={animatedOnIconStyle}>
                <WheelIcon name={iconForOn} size={size} disabled={disabled} />
              </Animated.View>
              <Animated.View style={animatedOffIconStyle}>
                <WheelIcon name={iconForOff} size={size} disabled={disabled} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Pressable>
        <Text
          testID="switch-title"
          style={[styles.text(disabled, labelColor), labelStyle]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.helperTextContainer}>
        {hasHelperTextIcon && helperTextCustomIcon}
        <HelperText
          testID="switch-helpertext"
          type="info"
          visible={helperText}
          style={[styles.helperText, helperTextStyle]}
        >
          {helperText}
        </HelperText>
      </View>
    </View>
  );
};

const WheelIcon = ({ name, size, disabled }) => {
  return (
    <Icon
      name={name}
      size={(size * 2) / 3}
      style={styles.wheelIcon(size)}
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
    marginTop: 10,
  },
  animatedOuterContainer: (size) => ({
    width: (size * 5) / 3,
    height: size,
    borderRadius: size / 2,
    justifyContent: 'center',
  }),
  animatedInnerContainer: (size, disabled, backgroundColor) => ({
    width: size - 5,
    height: size - 5,
    backgroundColor: disabled ? COLOR.WHITE : backgroundColor,
    borderRadius: (size - 5) / 2,
  }),
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
  wheelIcon: (size) => ({
    position: 'absolute',
    left: size / 6 - 2,
    top: size / 8 - 2,
  }),
  text: (disabled, color) => ({
    marginStart: 10,
    fontSize: 16,
    color: disabled ? COLOR.DISABLED : color,
  }),
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperText: (size) => ({
    marginStart: (size * 5) / 3 - 2,
  }),
});
