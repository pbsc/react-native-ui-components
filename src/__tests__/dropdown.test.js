import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Dropdown } from '../index';

afterEach(cleanup);

const dropdownItems = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
];
describe('Dropdown tests', () => {
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

    const textLabel = getByTestId('textLabel');
    const dropdownItems = getByTestId('dropdownMenu');
    expect(dropdownItems).toHaveProp('visible', false);

    fireEvent.press(textLabel);
    expect(dropdownItems).toHaveProp('visible', true);
  });

  it('dropdown show its helper text', () => {
    const helperText = 'This is helper text';

    const { getByTestId } = render(
      <Dropdown
        label="This is dropdown"
        items={dropdownItems}
        helperText="This is helper text for dropdown"
      />
    );
    const helperTextLabel = getByTestId('helperTextLabel');

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

    const textLabel = getByTestId('textLabel');
    fireEvent.press(textLabel);

    const selectedItem = getByTestId('item-3');
    fireEvent.press(selectedItem);

    expect(mockFn).toBeCalledWith(dropdownItems[3]);
  });
});
