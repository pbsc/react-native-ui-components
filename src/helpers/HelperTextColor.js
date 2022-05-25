import { COLOR } from './Colors';

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
