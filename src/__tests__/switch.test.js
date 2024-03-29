import React, { useState } from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Switch } from '../index';

afterEach(cleanup);

describe('Switch unit testing', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <Switch
          label="This is Switch"
          helperText="This is helper text for switch."
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('switch shows its title and helper text', () => {
    const titleText = 'This is switch';
    const helperText = 'This is helper text for switch';

    const { getByTestId } = render(
      <Switch label={titleText} helperText={helperText} />
    );

    const helperTextLabel = getByTestId('switch-helpertext');

    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('switch change its state when pressed', () => {
    const SwitchWithState = () => {
      const [isOn, setIsOn] = useState(false);
      return <Switch isOn={isOn} onChange={() => setIsOn(!isOn)} />;
    };

    const { getByTestId, queryByTestId } = render(<SwitchWithState />);

    const switchBody = getByTestId('switch-body');
    expect(queryByTestId('switch-wheel-on')).toBeNull();
    expect(queryByTestId('switch-wheel-off')).toBeTruthy();

    fireEvent.press(switchBody);
    expect(queryByTestId('switch-wheel-on')).toBeTruthy();
    expect(queryByTestId('switch-wheel-off')).toBeNull();
  });

  it('switch changes its status and passes it when pressed', () => {
    let isOn = false;
    const mockFn = jest.fn();

    const { getByTestId } = render(
      <Switch
        label="This is switch"
        checked={isOn}
        onChange={mockFn}
        helperText="This is helper text for switch."
      />
    );

    const switchBody = getByTestId('switch-body');
    fireEvent.press(switchBody);
    expect(mockFn).toBeCalledWith(!isOn);
  });
});
