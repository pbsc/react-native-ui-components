import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { PasswordStrength } from '../index';

afterEach(cleanup);

describe('Password Strength unit testing', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <PasswordStrength
          value="test123"
          isValid={() => {}}
          passwordStrengthValidation={{}}
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('passwordStrength shows good colors for very strong password', () => {
    const textFieldvalue = 'SD3ds@3s';
    const passwordValidation = {
      valid: true,
      strength: 'VERY_STRONG',
      warning: '',
      suggestions: ['Very strong'],
    };

    const { getByTestId } = render(
      <PasswordStrength
        value={textFieldvalue}
        isValid={() => {}}
        passwordStrengthValidation={passwordValidation}
      />
    );
    const helperColor0 = getByTestId('passwordStrength-color-0');
    const helperColor1 = getByTestId('passwordStrength-color-1');
    const helperColor2 = getByTestId('passwordStrength-color-2');
    const helperColor3 = getByTestId('passwordStrength-color-3');
    const helperColor4 = getByTestId('passwordStrength-color-4');

    expect(helperColor0.props.style.backgroundColor).toBe('#DC2619');
    expect(helperColor1.props.style.backgroundColor).toBe('#FFA114');
    expect(helperColor2.props.style.backgroundColor).toBe('#76BC21');
    expect(helperColor3.props.style.backgroundColor).toBe('#349724');
    expect(helperColor4.props.style.backgroundColor).toBe('#287C1A');
  });

  it('passwordStrength shows good colors for strong', () => {
    const textFieldvalue = 'SD3ds@3s';
    const passwordValidation = {
      valid: true,
      strength: 'STRONG',
      warning: '',
      suggestions: ['Strong'],
    };

    const { getByTestId } = render(
      <PasswordStrength
        value={textFieldvalue}
        isValid={() => {}}
        passwordStrengthValidation={passwordValidation}
      />
    );
    const helperColor0 = getByTestId('passwordStrength-color-0');
    const helperColor1 = getByTestId('passwordStrength-color-1');
    const helperColor2 = getByTestId('passwordStrength-color-2');
    const helperColor3 = getByTestId('passwordStrength-color-3');
    const helperColor4 = getByTestId('passwordStrength-color-4');

    expect(helperColor0.props.style.backgroundColor).toBe('#DC2619');
    expect(helperColor1.props.style.backgroundColor).toBe('#FFA114');
    expect(helperColor2.props.style.backgroundColor).toBe('#76BC21');
    expect(helperColor3.props.style.backgroundColor).toBe('#349724');
    expect(helperColor4.props.style.backgroundColor).toBe('#C4C4C4');
  });

  it('passwordStrength shows good colors for good', () => {
    const textFieldvalue = 'SD3ds@3s';
    const passwordValidation = {
      valid: true,
      strength: 'GOOD',
      warning: '',
      suggestions: ['Strong'],
    };

    const { getByTestId } = render(
      <PasswordStrength
        value={textFieldvalue}
        isValid={() => {}}
        passwordStrengthValidation={passwordValidation}
      />
    );
    const helperColor0 = getByTestId('passwordStrength-color-0');
    const helperColor1 = getByTestId('passwordStrength-color-1');
    const helperColor2 = getByTestId('passwordStrength-color-2');
    const helperColor3 = getByTestId('passwordStrength-color-3');
    const helperColor4 = getByTestId('passwordStrength-color-4');

    expect(helperColor0.props.style.backgroundColor).toBe('#DC2619');
    expect(helperColor1.props.style.backgroundColor).toBe('#FFA114');
    expect(helperColor2.props.style.backgroundColor).toBe('#76BC21');
    expect(helperColor3.props.style.backgroundColor).toBe('#C4C4C4');
    expect(helperColor4.props.style.backgroundColor).toBe('#C4C4C4');
  });

  it('passwordStrength shows good colors for fair', () => {
    const textFieldvalue = 'SD3ds@3s';
    const passwordValidation = {
      valid: false,
      strength: 'FAIR',
      warning: '',
      suggestions: ['Strong'],
    };

    const { getByTestId } = render(
      <PasswordStrength
        value={textFieldvalue}
        isValid={() => {}}
        passwordStrengthValidation={passwordValidation}
      />
    );
    const helperColor0 = getByTestId('passwordStrength-color-0');
    const helperColor1 = getByTestId('passwordStrength-color-1');
    const helperColor2 = getByTestId('passwordStrength-color-2');
    const helperColor3 = getByTestId('passwordStrength-color-3');
    const helperColor4 = getByTestId('passwordStrength-color-4');

    expect(helperColor0.props.style.backgroundColor).toBe('#DC2619');
    expect(helperColor1.props.style.backgroundColor).toBe('#FFA114');
    expect(helperColor2.props.style.backgroundColor).toBe('#C4C4C4');
    expect(helperColor3.props.style.backgroundColor).toBe('#C4C4C4');
    expect(helperColor4.props.style.backgroundColor).toBe('#C4C4C4');
  });

  it('passwordStrength shows good colors for weak', () => {
    const textFieldvalue = 'SD3ds@3s';
    const passwordValidation = {
      valid: false,
      strength: 'WEAK',
      warning: '',
      suggestions: ['Strong'],
    };

    const { getByTestId } = render(
      <PasswordStrength
        value={textFieldvalue}
        isValid={() => {}}
        passwordStrengthValidation={passwordValidation}
      />
    );
    const helperColor0 = getByTestId('passwordStrength-color-0');
    const helperColor1 = getByTestId('passwordStrength-color-1');
    const helperColor2 = getByTestId('passwordStrength-color-2');
    const helperColor3 = getByTestId('passwordStrength-color-3');
    const helperColor4 = getByTestId('passwordStrength-color-4');

    expect(helperColor0.props.style.backgroundColor).toBe('#DC2619');
    expect(helperColor1.props.style.backgroundColor).toBe('#C4C4C4');
    expect(helperColor2.props.style.backgroundColor).toBe('#C4C4C4');
    expect(helperColor3.props.style.backgroundColor).toBe('#C4C4C4');
    expect(helperColor4.props.style.backgroundColor).toBe('#C4C4C4');
  });
});
