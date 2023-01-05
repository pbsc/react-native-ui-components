import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const PBSCPasswordStrength = ({ value, passwordStrengthValidation }) => {
  const [passwordStrength, setPasswordStrength] = useState(
    strengthListDictionary[0]
  );

  useEffect(() => {
    if (value !== '') {
      /*
      validateInput(bikeNetwork.url, bikeNetwork.apiKey, 'en').then((data) => {
        isValid(data.valid);
        const findStrength = strengthListDictionary.find((list) => list.strength === data.strength);
        if (findStrength) {
          setPasswordStrength({ ...findStrength, suggestions: data.suggestions});
          console.log('findStrength', { ...findStrength, suggestions: data.suggestions})
        } 
      })
      */
      //isValid(passwordStrengthValidation.valid);

      const findStrength = strengthListDictionary.find(
        (list) => list.strength === passwordStrengthValidation.strength
      );
      if (findStrength) {
        setPasswordStrength({
          ...findStrength,
          suggestions: passwordStrengthValidation.suggestions,
        });
        console.log('findStrength', {
          ...findStrength,
          suggestions: passwordStrengthValidation.suggestions,
        });
      }
    } else {
      setPasswordStrength(strengthListDictionary[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /*
  const validateInput = (apiUrl, apiKey, language) => {
    return requestPublicCustomerAPI(
        apiUrl,
        apiKey,
        `/validation/password-strength`,
        'POST',
        {
          headers: {
            'Accept-Language': normalizeLanguagecode(language)
          },
          password: value
        }
      );
  }
  */

  return (
    <View>
      <View>
        <Text>
          {`Password strength (${passwordStrength.strengthLevel} of 5)`}
        </Text>
      </View>
      <View style={styles.strengthBarWrapper}>
        {passwordStrength.color.map((color) => (
          <View style={{ backgroundColor: color, ...styles.strengthBar }} />
        ))}
      </View>
      <View>
        {passwordStrength.suggestions.map((suggestion) => (
          <Text>{suggestion}</Text>
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
});
