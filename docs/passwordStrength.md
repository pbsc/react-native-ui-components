# PasswordStrength
<table>
   <tr>
      <td><img src="./resources/passwordStrength1.png" alt="passwordStrength nothing" /></td>
      <td><img src="./resources/passwordStrength2.png" alt="passwordStrength weak" /></td>
      <td><img src="./resources/passwordStrength3.png" alt="passwordStrength fair" /></td>
      <td><img src="./resources/passwordStrength4.png" alt="passwordStrength good" /></td>
      <td><img src="./resources/passwordStrength5.png" alt="passwordStrength strong" /></td>
      <td><img src="./resources/passwordStrength6.png" alt="passwordStrength very strong" /></td>
  </tr>
</table>

## Usage

```js
import React, { useState } from 'react';
import { PasswordStrength } from '@pbsc/react-native-ui-components';

// ...

const [passwordStrengthValue, setPasswordStrengthValue] = useState('');
const [passwordStrengthValidation, setPasswordStrengthValidation] = useState(
    {}
);

const validateInputStrenghtApi = async (value) => {
    setPasswordStrengthValue(value);

    // Fonction or Api that return the strength
    const passwordWeakness = StrengthChecker(value);

    setPasswordStrengthValidation(passwordWeakness);
};

// ...

<TextField
    label="Password Strenght Input"
    value={passwordStrengthValue}
    onChangeText={validateInputStrenghtApi}
/>
<PasswordStrength
    value={passwordStrengthValue}
    isValid={() => {}}
    passwordStrengthValidation={passwordStrengthValidation}
/>
```

## Props
### value
Type: string <br/>
The text typed in the textfield.

### isValid
Type: boolean <br/>
Return true if the value entered is valid

### passwordStrengthValidation
Type: object <br/>
A object that contain the current validation based on the text entered in the textField
Value for strength: "VERY_STRONG", "STRONG", "GOOD", "FAIR", "WEAK".
Suggestions: Text to specify how to get a higher password strength

// ...
{
    valid: true,
    strength: 'VERY_STRONG',
    warning: '',
    suggestions: ['Very strong'],
};
```
