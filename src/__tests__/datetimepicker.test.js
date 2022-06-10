import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { DateTimePicker } from '../index';
import { COLOR } from '../helpers/Colors';

afterEach(cleanup);

describe('DateTimePicker unit testing', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(<DateTimePicker label="Birthday" locale="en" mode="date" />)
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('datepicker shows its helper text', () => {
    const helperText = 'This is helper text for date picker';

    const { getByTestId } = render(
      <DateTimePicker
        label="Birthday"
        locale="en"
        mode="date"
        helperText={helperText}
      />
    );
    const helperTextLabel = getByTestId('datepicker-helpertext');

    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('color changed to error color when has error', () => {
    const helperText = 'This is error message.';

    const { getByTestId } = render(
      <DateTimePicker
        label="Birthday"
        locale="en"
        mode="date"
        hasError
        helperText={helperText}
      />
    );

    const helperTextLabel = getByTestId('datepicker-helpertext');
    expect(helperTextLabel.props.style.color).toBe(COLOR.PBSC_RED);
  });

  it('datepicker modal shown after pressed', () => {
    const { getByTestId } = render(
      <DateTimePicker label="Birthday" locale="en" mode="date" />
    );

    const datePickerInput = getByTestId('datepicker-input');
    const datePickerModal = getByTestId('datepicker-modal');
    expect(datePickerModal).toHaveProp('visible', false);

    fireEvent.press(datePickerInput);
    expect(datePickerModal).toHaveProp('visible', true);
  });

  it('datepicker passes selected date', () => {
    const mockFn = jest.fn();
    const dateOnPicker = new Date(2001, 0, 21);
    const selectedDate = new Date(2022, 11, 25);

    const { getByTestId } = render(
      <DateTimePicker
        label="Birthday"
        locale="en"
        mode="date"
        value={dateOnPicker}
        onConfirm={mockFn}
      />
    );

    const datePickerInput = getByTestId('datepicker-input');
    fireEvent.press(datePickerInput);

    const datePicker = getByTestId('datepicker-picker');
    fireEvent(datePicker, 'dateChange', selectedDate);

    const confirmButton = getByTestId('datepicker-confirm');
    fireEvent(confirmButton, 'pressOut');

    expect(mockFn).toBeCalledWith(selectedDate);
  });

  it('datepicker does not change its date when cancel pressed', () => {
    const mockFn = jest.fn();
    const dateOnPicker = new Date(2001, 1, 21);
    const selectedDate = new Date(2022, 12, 25);

    const { getByTestId } = render(
      <DateTimePicker
        label="Birthday"
        locale="en"
        mode="date"
        value={dateOnPicker}
        onCancel={mockFn}
      />
    );

    const datePickerInput = getByTestId('datepicker-input');
    fireEvent.press(datePickerInput);

    const datePicker = getByTestId('datepicker-picker');
    fireEvent(datePicker, 'dateChange', selectedDate);

    const cancelButton = getByTestId('datepicker-cancel');
    fireEvent(cancelButton, 'pressOut');

    expect(mockFn).toBeCalledWith(dateOnPicker);
  });
});
