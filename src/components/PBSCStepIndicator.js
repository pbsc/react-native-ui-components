import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../helpers/Colors';

const PBSCStepIndicator = (props) => {
  const {
    steps,
    currentStepIndex = -1,
    inactiveColor,
    height = 6,
    textColor = COLOR.BLACK,
    textSize = 12,
    style,
    stepStyle,
    textStyle,
  } = props;

  if (steps == undefined || steps.length < 1) {
    return (
      <View style={styles.container}>
        <Text>This component needs steps array.</Text>
      </View>
    );
  }
  const textBeforeStart = steps[0].text;
  steps.shift();
  const stepColors = steps.map((step) => step.color);
  const stepTexts = steps.map((step) => step.text);

  return (
    <View style={{ width: '80%', ...style }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: -5,
        }}
      >
        {stepColors.map((value, index) => {
          return (
            <PBSCStep
              index={index}
              currentIndex={currentStepIndex}
              activeColor={value}
              inactiveColor={inactiveColor}
              height={height}
              stepStyle={stepStyle}
              key={index}
            />
          );
        })}
      </View>
      <Text
        style={{
          color: textColor,
          fontSize: textSize,
          marginVertical: 5,
          ...textStyle,
        }}
      >
        {currentStepIndex < 0 ? textBeforeStart : stepTexts[currentStepIndex]}
      </Text>
    </View>
  );
};

export default PBSCStepIndicator;

const PBSCStep = (props) => {
  const {
    index,
    currentIndex,
    activeColor,
    inactiveColor = '#bbbbbb',
    height,
    stepStyle,
  } = props;
  if (index > currentIndex) {
    return (
      <View
        style={[
          styles.step,
          {
            backgroundColor: inactiveColor,
            borderRadius: height / 2,
            height: height,
          },
          stepStyle,
        ]}
      ></View>
    );
  } else {
    return (
      <View
        style={[
          styles.step,
          {
            backgroundColor: activeColor,
            borderRadius: height / 2,
            height: height,
          },
          stepStyle,
        ]}
      ></View>
    );
  }
};

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
