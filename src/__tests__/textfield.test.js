import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { TextField } from '../index';

afterEach(cleanup);

describe('TextField tests', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <TextField
          title="Hello"
          placeholer="Please input your name"
          helperText="This is helper text"
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('textfield has proper title and placeholder', () => {
    const titleText = 'This is a sample title.';
    const placeholerText = 'Please input anything,';

    const { getByTestId } = render(
      <TextField title={titleText} placeholer={placeholerText} />
    );

    const inputField = getByTestId('input');

    expect(inputField).toHaveTextContent(titleText);

    fireEvent.changeText(inputField, '');

    expect(inputField).toHaveTextContent(placeholerText);
  });

  it('textfield passes input text', () => {
    const mockFn = jest.fn();
    const inputText = 'This is a sample input text.';

    const { getByTestId } = render(
      <TextField label="Test TextField" onChangeText={mockFn} />
    );

    const inputField = getByTestId('input');

    fireEvent.changeText(inputField, inputText);

    expect(mockFn).toBeCalledWith(inputText);
  });
});
