import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { ZipcodeField } from '../index';
import { COLOR } from '../helpers/Colors';
import { formatPhoneNumber } from '../helpers/PhoneNumberService';

afterEach(cleanup);

describe('ZipcodeField unit testing', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(<ZipcodeField label="Postal Code" country="CA" />)
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('zipcoderfield shows its helper text', () => {
    const helperText = 'This is helper text for zip code field';

    const { getByTestId } = render(
      <ZipcodeField label="Postal Code" country="CA" helperText={helperText} />
    );
    const helperTextLabel = getByTestId('textfield-helpertext');

    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('color changed to error color when has error', () => {
    const helperText = 'This is error message';

    const { getByTestId } = render(
      <ZipcodeField
        label="Postal Code"
        country="CA"
        hasError
        helperText={helperText}
      />
    );

    const helperTextLabel = getByTestId('textfield-helpertext');
    expect(helperTextLabel.props.style.color).toBe(COLOR.PBSC_RED);
  });

  it('zipcodefield does not allow wrong format', () => {
    const mockFn = jest.fn();
    const postalCode = '12345';

    const { getByTestId } = render(
      <ZipcodeField label="Postal Code" country="CA" onChangeText={mockFn} />
    );

    const inputField = getByTestId('textfield-input');
    fireEvent.changeText(inputField, postalCode);
    expect(mockFn).toBeCalledTimes(0);
  });

  it('zipcodefield allows write format', () => {
    const mockFn = jest.fn();
    const zipCode = '12345';

    const { getByTestId } = render(
      <ZipcodeField label="Postal Code" country="US" onChangeText={mockFn} />
    );

    const inputField = getByTestId('textfield-input');
    fireEvent.changeText(inputField, zipCode);
    expect(mockFn).toBeCalledWith(zipCode);
  });
});
