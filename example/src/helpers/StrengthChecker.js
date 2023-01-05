const strongPassword = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
);
const mediumPassword = new RegExp(
  '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
);

export const StrengthChecker = (password) => {
  if (strongPassword.test(password)) {
    return {
      valid: true,
      strength: 'VERY_STRONG',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: [],
    };
  } else if (mediumPassword.test(password)) {
    return {
      valid: true,
      strength: 'GOOD',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: [
        'Add another word or two. Uncommon words are better.',
        "Predictable substitutions like '@' instead of 'a' don't help very much.",
      ],
    };
  } else {
    return {
      valid: false,
      strength: 'WEAK',
      warning: 'Ce mot de passe est similaire à un mot de passe commun.',
      suggestions: [
        'Add another word or two. Uncommon words are better.',
        "Predictable substitutions like '@' instead of 'a' don't help very much.",
      ],
    };
  }
};
