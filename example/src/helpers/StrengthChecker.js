const veryStrongPassword = new RegExp(
  '(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}'
);
const strongPassword = new RegExp(
  '(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])'
);

const goodPassword = new RegExp('(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])');

const fairPassword = new RegExp('(?=.*[A-Z].*[A-Z])');

export const StrengthChecker = (password) => {
  if (veryStrongPassword.test(password)) {
    return {
      valid: true,
      strength: 'VERY_STRONG',
      warning: '',
      suggestions: ['Very strong'],
    };
  } else if (strongPassword.test(password)) {
    return {
      valid: true,
      strength: 'STRONG',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: [
        'Ensure string has three lowercase letters.',
        'Ensure string is of length 8.',
      ],
    };
  } else if (goodPassword.test(password)) {
    return {
      valid: true,
      strength: 'GOOD',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: ['Ensure string has two digits.'],
    };
  } else if (fairPassword.test(password)) {
    return {
      valid: true,
      strength: 'FAIR',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: ['Ensure string has one special case letter.'],
    };
  } else {
    return {
      valid: false,
      strength: 'WEAK',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: ['Ensure string has two uppercase letters.'],
    };
  }
};
