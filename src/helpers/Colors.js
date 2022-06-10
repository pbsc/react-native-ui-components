export const COLOR = {
  BLACK: '#000',
  GRAY_MEDIUM: '#7a7a7a',
  GRAY_LIGHT: '#9a9a9a',
  GRAY_PALE: '#ebebeb',
  DISABLED: '#bdbdbd',
  WHITE: '#fff',
  PBSC_GREEN: '#76BC21',
  PBSC_RED: '#b00020',
  PBSC_BLUE: '#027bff',
  PURPLE_LIGHT: '#7A81FF',
};

export const helperTextColor = (hasError, disabled, errorColor) => {
  if (hasError) {
    if (disabled) {
      return `${errorColor}80`; // Add alpha value 80 so that looks pale
    } else {
      return errorColor;
    }
  } else {
    if (disabled) {
      return COLOR.DISABLED;
    } else {
      return COLOR.GRAY_MEDIUM;
    }
  }
};
