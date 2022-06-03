# StepIndicator
<table >
   <tr>
      <td><img src="./resources/stepindicator_0th.png" alt="StepIndicator 0th step" /></td>
      <td><img src="./resources/stepindicator_3rd.png" alt="StepIndicator 3rd step" /></td>
      <td><img src="./resources/stepindicator_5th.png" alt="StepIndicator 5th step" /></td>
  </tr>
</table>

## Usage

```js
import { StepIndicator } from '@pbsc/react-native-ui-components'

// ...

const stepsForStepIndicator = [
    { text: 'This is 0th step' },
    { color: '#dd2618', text: 'This is 1st step' },
    { color: '#fea112', text: 'This is 2nd step' },
    { color: '#76bc23', text: 'This is 3rd step' },
    { color: '#349822', text: 'This is 4th step' },
    { color: '#297d19', text: 'This is 5th step' },
];

// ...

<StepIndicator steps={stepsForStepIndicator} currentStepIndex={4} />
```

## Props
### steps
Type: array of objects. (each object has `color` and `text`) <br/>
State variable that holds the steps.

### currentStepIndex
Type: number <br/>
Default value: -1 <br/>
The index of the current step.  Steps before the current step (inclusive) show up as their own colors.  Steps after the current step (exclusive) show up as gray color.

### width
Type: string/number <br/>
Default value: '80%' <br/>
Set the width of the StepIndicator

### height
Type: string/number <br/>
Default value: 6
Set the height of the StepIndicator

### textColor
Type: hexColorCode (ex: #ff00ff) <br/>
Default value: #000000 <br/>
Label's color

### textSize
Type: number <br/>
Default value: 12
Label's text size (fontSize)

### style
Type: object <br/>
Set style of container part

### stepStyle
Type: object <br/>
Set style of each step

### textStyle
Type: object <br/>
Set style of label text part
