# @pbsc/react-native-ui-components

This module has been developed for UI components for CycleFinder app.
It includes `TextField`, `Checkbox`, `Switch`, and `Dropdown`.

## Prerequisites

Before install this module, you will need `react-native-paper` (`react-native-vector-icons` as well) and `react-native-reanimated`.
Please install them first if you don't have them in your project.

### Install react-native-paper

```sh
npm install react-native-paper
```

### Install react-native-vector-icons

```sh
npm install react-native-vector-icons
```

After the installation, you will need `link` it.

```sh
$ react-native link react-native-vector-icons
```

For detail information, please refer <a href='https://github.com/oblador/react-native-vector-icons'>here</a>.

### Install react-native-reanimated

```sh
npm install react-native-reanimated
```

After the installation, you will need to add `babel plugin`.
For detail information, please refer <a href='https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/'>here</a>.

## Installation

```sh
npm install @pbsc/react-native-ui-components
```

## Usage

```js
import {
  TextInput,
  Checkbox,
  Switch,
  Dropdown,
} from '@pbsc/react-native-ui-components';

// ...

<TextInput />;
<Checkbox />;
<Switch />;
<Dropdown />;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
