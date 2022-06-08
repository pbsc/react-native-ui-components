import React, { useState } from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Checkbox } from '../index';

afterEach(cleanup);

describe('Checkbox unit testing', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <Checkbox
          label="This is checkbox"
          helperText="This is helper text for checkbox"
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('checkbox shows its title and helper text', () => {
    const titleText = 'This is checkbox';
    const helperText = 'This is helper text for checkbox';

    const { getByTestId } = render(
      <Checkbox label={titleText} helperText={helperText} />
    );

    const titleLabel = getByTestId('checkbox-title');
    const helperTextLabel = getByTestId('checkbox-helpertext');

    expect(titleLabel).toHaveTextContent(titleText);
    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('checkbox change its state when pressed', () => {
    const CheckboxWithState = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      );
    };

    const { getByTestId, queryByTestId } = render(<CheckboxWithState />);

    const checkbox = getByTestId('checkbox-body');
    expect(queryByTestId('checkbox-mark')).toBeNull();
    fireEvent.press(checkbox);
    expect(queryByTestId('checkbox-mark')).toBeTruthy();
  });

  it('checkbox passes its status when pressed', () => {
    const checked = false;
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <Checkbox
        label="This is checkbox"
        checked={checked}
        onChange={mockFn}
        helperText="This is helper text for checkbox."
      />
    );

    const checkbox = getByTestId('checkbox-body');
    fireEvent.press(checkbox);
    expect(mockFn).toBeCalledWith(!checked);
  });
});
