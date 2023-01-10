import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const baseFullColor = ['#DC2619', '#FFA114', '#76BC21', '#349724', '#287C1A']

const strengthListDictionary = [
  {
    strength: 'EMPTY',
    color: ['#C4C4C4', '#C4C4C4', '#C4C4C4', '#C4C4C4', '#C4C4C4'],
    strengthLevel: 0,
    suggestions: [],
  },
  {
    strength: 'WEAK',
    color: ['#DC2619', '#C4C4C4', '#C4C4C4', '#C4C4C4', '#C4C4C4'],
    strengthLevel: 1,
    suggestions: [],
  },
  {
    strength: 'FAIR',
    color: ['#DC2619', '#FFA114', '#C4C4C4', '#C4C4C4', '#C4C4C4'],
    strengthLevel: 2,
    suggestions: [],
  },
  {
    strength: 'GOOD',
    color: ['#DC2619', '#FFA114', '#76BC21', '#C4C4C4', '#C4C4C4'],
    strengthLevel: 3,
    suggestions: [],
  },
  {
    strength: 'STRONG',
    color: ['#DC2619', '#FFA114', '#76BC21', '#349724', '#C4C4C4'],
    strengthLevel: 4,
    suggestions: [],
  },
  {
    strength: 'VERY_STRONG',
    color: ['#DC2619', '#FFA114', '#76BC21', '#349724', '#287C1A'],
    strengthLevel: 5,
    suggestions: [],
  },
];

const PBSCPasswordStrength = (props) => {
  const {
    width = '80%',
    style,
    isValid,
    value,
    passwordStrengthValidation,
    strengthLabel = 'Password strength',
    fractionLabel = 'of'
  } = props;

  const [passwordStrength, setPasswordStrength] = useState(
    strengthListDictionary[0]
  );

  useEffect(() => {
    if (value !== '') {
      const findStrength = strengthListDictionary.find(
        (list) => list.strength === passwordStrengthValidation.strength
      );
      if (findStrength) {
        setPasswordStrength({
          ...findStrength,
          suggestions: passwordStrengthValidation.suggestions,
        });
        isValid(passwordStrengthValidation.valid);
      }
    } else {
      setPasswordStrength(strengthListDictionary[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getSuggestionsText = () => {
    let suggestionsText = '';
    passwordStrength.suggestions.map((suggestion) => {
      if (suggestionsText === '') {
        suggestionsText = suggestion;
      } else {
        suggestionsText = `${suggestionsText} ${suggestion}`;
      }
    });
    return suggestionsText;
  };

  return (
    <View style={[{ width }, style]}>
      <View style={styles.titleWrapper}>
        <Text>{`${strengthLabel} `}</Text>
        <Text
          style={{
            color: passwordStrength.color[passwordStrength.strengthLevel - 1],
          }}
        >
          {`(${passwordStrength.strengthLevel} ${fractionLabel} 5)`}
        </Text>
      </View>
      <View style={styles.strengthBarWrapper}>
        {passwordStrength.color.map((color, index) => (
          <View
            testID={`passwordStrength-color-${index}`}
            key={index}
            style={{ backgroundColor: color, ...styles.strengthBar }}
          />
        ))}
      </View>
      <View style={styles.suggestionsWrapper}>
        {passwordStrength.suggestions.map((suggestion) => (
          <Text>{`${suggestion}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default PBSCPasswordStrength;

const styles = StyleSheet.create({
  strengthBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strengthBar: {
    height: 5,
    width: '18%',
    borderRadius: 5,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  suggestionsWrapper: {
    marginTop: 10,
  },
});
