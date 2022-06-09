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

  //   it('datepicker modal shown after pressed', () => {
  //     const { getByTestId, queryByTestId } = render(
  //       <DateTimePicker label="Birthday" locale="en" mode="date" />
  //     );

  //     const datePickerInput = getByTestId('datepicker-input');
  //     expect(queryByTestId('datepicker-modal')).toBeNull();

  //     fireEvent.press(datePickerInput);
  //     expect(queryByTestId('datepicker-modal')).toBeTruthy();
  //   });

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

  //   it('datepicker passes selected item', () => {
  //     const mockFn = jest.fn();

  //     const { getByTestId } = render(
  //       <DateTimePicker
  //         label="Birthday"
  //         locale="en"
  //         mode="date"
  //         onConfirm={mockFn}
  //       />
  //     );

  //     const dropdownInput = getByTestId('datepicker-input');
  //     fireEvent.press(dropdownInput);

  //     const selectedItem = getByTestId('dropdown-item-3');
  //     fireEvent.press(selectedItem);

  //     expect(mockFn).toBeCalledWith(dropdownItems[3]);
  //   });
});
