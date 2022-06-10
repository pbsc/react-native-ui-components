import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { PhoneNumberField } from '../index';
import { COLOR } from '../helpers/Colors';
import { formatPhoneNumber } from '../helpers/PhoneNumberService';

afterEach(cleanup);

describe('PhoneNumberField unit testing', () => {
  const prefixes = [
    { label: '+1 🇨🇦', value: '+1' },
    { label: '+33 🇫🇷', value: '+33' },
    { label: '+44 🇬🇧', value: '+44' },
    { label: '+82 🇰🇷', value: '+82' },
    { label: '+672 🇳🇫', value: '+672' },
  ];

  it('should render component without crashing', () => {
    jest.useFakeTimers();
    const rendered = renderer
      .create(
        <PhoneNumberField
          label="Phone Number"
          prefixes={prefixes}
          helperText="Hello"
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('phonenumberfield shows its helper text', () => {
    const helperText = 'This is helper text for phone number field';

    const { getByTestId } = render(
      <PhoneNumberField
        label="Phone Number"
        prefixes={prefixes}
        helperText={helperText}
      />
    );
    const helperTextLabel = getByTestId('phonenumberfield-helpertext');

    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('color changed to error color when has error', () => {
    const helperText = 'This is error message';

    const { getByTestId } = render(
      <PhoneNumberField
        label="Phone Number"
        prefixes={prefixes}
        hasError
        helperText={helperText}
      />
    );

    const helperTextLabel = getByTestId('phonenumberfield-helpertext');
    expect(helperTextLabel.props.style.color).toBe(COLOR.PBSC_RED);
  });

  it('prefix menu shown after pressed', () => {
    const { getByTestId } = render(
      <PhoneNumberField label="Phone Number" prefixes={prefixes} />
    );

    const dropdownInput = getByTestId('dropdown-input');
    const dropdownModal = getByTestId('dropdown-modal');
    expect(dropdownModal).toHaveProp('visible', false);

    fireEvent.press(dropdownInput);
    expect(dropdownModal).toHaveProp('visible', true);
  });

  it('prefix dropdown passes selected item', () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <PhoneNumberField
        label="Phone Number"
        prefixes={prefixes}
        onSelectPrefix={mockFn}
      />
    );

    const prefixDropdownInput = getByTestId('dropdown-input');
    fireEvent.press(prefixDropdownInput);

    const selectedItem = getByTestId('dropdown-item-3');
    fireEvent.press(selectedItem);

    expect(mockFn).toBeCalledWith(prefixes[3]);
  });

  it('phone number field passes input value', () => {
    const mockFnOnTextChange = jest.fn();
    const phoneNumber = '1234567890';
    const mockFnOnSubmitEditing = jest.fn();

    const { getByTestId } = render(
      <PhoneNumberField
        label="Phone Number"
        prefixes={prefixes}
        onChangeText={mockFnOnTextChange}
        onSubmitEditing={mockFnOnSubmitEditing}
      />
    );

    const phoneNumberInput = getByTestId('phonenumberfield-input');
    expect(phoneNumberInput).toHaveProp('editable', false);

    const prefixDropdownInput = getByTestId('dropdown-input');
    fireEvent.press(prefixDropdownInput);
    const selectedItem = getByTestId('dropdown-item-3');
    fireEvent.press(selectedItem);

    expect(phoneNumberInput).toHaveProp('editable', true);

    fireEvent.changeText(phoneNumberInput, phoneNumber);
    expect(mockFnOnTextChange).toBeCalledWith(phoneNumber);

    fireEvent(phoneNumberInput, 'blur');
    expect(mockFnOnSubmitEditing).toBeCalledWith(
      `${prefixes[3].value}-${formatPhoneNumber(phoneNumber)}`
    );
  });
});
