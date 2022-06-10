import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { TextField } from '../index';
import { COLOR } from '../helpers/Colors';

afterEach(cleanup);

describe('TextField unit testing', () => {
  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <TextField
          label="Hello"
          placeholder="Please input your name"
          helperText="This is helper text"
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('textfield show placeholder correctly', () => {
    const placeholderText = 'Please input anything,';

    const { getByTestId } = render(<TextField placeholder={placeholderText} />);

    const inputField = getByTestId('textfield-input');
    expect(inputField).toHaveProp('placeholder', placeholderText);
  });

  it('textfield shows value and text input by user', () => {
    const valueText = 'This is text in text field';
    const inputText = 'This is text input by user';

    const { getByTestId } = render(<TextField value={valueText} />);

    const inputField = getByTestId('textfield-input');
    expect(inputField).toHaveProp('value', valueText);

    fireEvent.changeText(inputField, inputText);
    expect(inputField).toHaveProp('value', inputText);
  });

  it('textfield shows its helper text', () => {
    const helperText = 'This is helper text';

    const { getByTestId } = render(<TextField helperText={helperText} />);

    const helperTextLabel = getByTestId('textfield-helpertext');
    expect(helperTextLabel).toHaveTextContent(helperText);
  });

  it('color changed to error color when has error', () => {
    const helperText = 'This is error message.';

    const { getByTestId } = render(
      <TextField hasError helperText={helperText} />
    );

    const helperTextLabel = getByTestId('textfield-helpertext');
    expect(helperTextLabel.props.style.color).toBe(COLOR.PBSC_RED);
  });

  it('textfield passes input text', () => {
    const mockFn = jest.fn();
    const inputText = 'This is a sample input text.';

    const { getByTestId } = render(
      <TextField label="Test TextField" onChangeText={mockFn} />
    );

    const inputField = getByTestId('textfield-input');
    fireEvent.changeText(inputField, inputText);
    expect(mockFn).toBeCalledWith(inputText);
  });

  it('textfield behaves as password', () => {
    const mockFn = jest.fn();
    const inputText = 'This is a sample input text.';

    const { getByTestId } = render(<TextField label="Password" password />);

    const inputField = getByTestId('textfield-input');
    expect(inputField).toHaveProp('secureTextEntry', true);

    const rightIcon = getByTestId('textfield-righticon');
    fireEvent.press(rightIcon);
    expect(inputField).toHaveProp('secureTextEntry', false);
  });
});
