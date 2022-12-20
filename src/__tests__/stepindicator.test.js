import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { StepIndicator } from '../index';
import { COLOR } from '../helpers/Colors';

afterEach(cleanup);

describe('StepIndicator unit testing', () => {
  const textBeforeStart = 'This is 0th step';
  const steps = [
    { color: '#dd2618', text: 'This is 1st step' },
    { color: '#fea112', text: 'This is 2nd step' },
    { color: '#76bc23', text: 'This is 3rd step' },
    { color: '#349822', text: 'This is 4th step' },
    { color: '#297d19', text: 'This is 5th step' },
  ];

  it('should render component without crashing', () => {
    const rendered = renderer
      .create(
        <StepIndicator
          textBeforeStart={textBeforeStart}
          steps={steps}
          currentStepIndex={2}
        />
      )
      .toJSON();

    expect(rendered).toBeTruthy();
  });

  it('stepindicator shows correct message before start (index = -1)', () => {
    const currentStep = -1;
    const { getByTestId } = render(
      <StepIndicator
        textBeforeStart={textBeforeStart}
        steps={steps}
        currentStepIndex={currentStep}
      />
    );

    const stepIndicatorText = getByTestId('stepindicator-text');
    expect(stepIndicatorText).toHaveTextContent(textBeforeStart);
  });

  it('stepindicator shows correct message after start (index >= 0)', () => {
    const currentStep = 2;
    const { getByTestId } = render(
      <StepIndicator
        textBeforeStart={textBeforeStart}
        steps={steps}
        currentStepIndex={currentStep}
      />
    );

    const stepIndicatorText = getByTestId('stepindicator-text');
    expect(stepIndicatorText).toHaveTextContent(steps[currentStep].text);
  });

  it('each steps show correct colors', () => {
    const currentStep = 2;
    const inactiveColor = COLOR.GRAY_LIGHT;
    const { getByTestId } = render(
      <StepIndicator
        textBeforeStart={textBeforeStart}
        steps={steps}
        currentStepIndex={currentStep}
        inactiveColor={inactiveColor}
      />
    );

    const step1st = getByTestId('stepindicator-step-0');
    const step2nd = getByTestId('stepindicator-step-1');
    const step3rd = getByTestId('stepindicator-step-2');
    const step4th = getByTestId('stepindicator-step-3');
    const step5th = getByTestId('stepindicator-step-4');
    expect(step1st.props.style[1].backgroundColor).toBe(steps[0].color);
    expect(step2nd.props.style[1].backgroundColor).toBe(steps[1].color);
    expect(step3rd.props.style[1].backgroundColor).toBe(steps[2].color);
    expect(step4th.props.style[1].backgroundColor).toBe(inactiveColor);
    expect(step5th.props.style[1].backgroundColor).toBe(inactiveColor);
  });
});
