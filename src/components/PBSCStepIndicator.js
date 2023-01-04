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

  if (steps === undefined || steps.length < 1) {
    return (
      <View style={styles.container}>
        <Text>This component needs steps array.</Text>
      </View>
    );
  }

  return (
    <View style={[{ width }, style]}>
      <View style={styles.stepContainer}>
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
      <View style={styles.helperTextContainer}>
        {hasHelperTextIcon && helperTextCustomIcon}
        <Text
          testID="stepindicator-text"
          style={[styles.helperText(textColor, textSize), textStyle]}
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
  stepContainer: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  step: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperText: (color, fontSize) => ({
    color,
    fontSize,
    marginVertical: 5,
    marginStart: 2,
  }),
});
