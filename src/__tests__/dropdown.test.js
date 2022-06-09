import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Dropdown } from '../index';

afterEach(cleanup);

describe('Dropdown unit testing', () => {
  const dropdownItems = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ];

  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <Dropdown
          label="This is dropdown"
          items={dropdownItems}
          helperText="This is helper text for dropdown"
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('dropdown menu shown after pressed', () => {
    const { getByTestId } = render(
      <Dropdown
        label="This is dropdown"
        items={dropdownItems}
        helperText="This is helper text for dropdown"
      />
    );

    const dropdownInput = getByTestId('dropdown-input');
    const dropdownModal = getByTestId('dropdown-modal');
    expect(dropdownModal).toHaveProp('visible', false);

    fireEvent.press(dropdownInput);
    expect(dropdownModal).toHaveProp('visible', true);
  });

  it('dropdown shows its helper text', () => {
    const helperText = 'This is helper text for dropdown';

    const { getByTestId } = render(
      <Dropdown
        label="This is dropdown"
        items={dropdownItems}
        helperText={helperText}
      />
    );
    const helperTextLabel = getByTestId('dropdown-helpertext');

    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('dropdown passes selected item', () => {
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <Dropdown
        label="This is dropdown"
        items={dropdownItems}
        helperText="This is helper text for dropdown"
        onSelect={mockFn}
      />
    );

    const dropdownInput = getByTestId('dropdown-input');
    fireEvent.press(dropdownInput);

    const selectedItem = getByTestId('dropdown-item-3');
    fireEvent.press(selectedItem);

    expect(mockFn).toBeCalledWith(dropdownItems[3]);
  });
});
