import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../helpers/Colors';

const PBSCStepIndicator = (props) => {
  const {
    steps,
    textBeforeStart,
    currentStepIndex = -1,
    inactiveColor = '#bbbbbb',
    width = '80%',
    height = 6,
    textColor = COLOR.BLACK,
    textSize = 12,
    style,
    stepStyle,
    textStyle,
    hasHelperTextIcon = false,
    helperTextCustomIcon, // any svg icon component to show before helper text or error text goes here
  } = props;

  if (steps == undefined || steps.length < 1) {
    return (
      <View style={styles.container}>
        <Text>This component needs steps array.</Text>
      </View>
    );
  }

  return (
    <View style={{ width: width, ...style }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: -5,
        }}
      >
        {steps.map((value, index) => {
          return (
            <View
              testID={`stepindicator-step-${index}`}
              style={[
                styles.step,
                {
                  backgroundColor:
                    index > currentStepIndex ? inactiveColor : value.color,
                  borderRadius: height / 2,
                  height: height,
                },
                stepStyle,
              ]}
              key={index}
            />
          );
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {hasHelperTextIcon && helperTextCustomIcon}
        <Text
          testID="stepindicator-text"
          style={{
            color: textColor,
            fontSize: textSize,
            marginVertical: 5,
            marginStart: 2,
            ...textStyle,
          }}
        >
          {currentStepIndex < 0
            ? textBeforeStart
            : steps[currentStepIndex].text}
        </Text>
      </View>
    </View>
  );
};

export default PBSCStepIndicator;

const styles = StyleSheet.create({
  step: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
