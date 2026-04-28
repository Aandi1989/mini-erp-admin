const REM_ENABLED = true;
const HTML_FONT_SIZE = 16;

export const convertPxToRem = (value: number, prefix = true) => {
  if (REM_ENABLED) {
    if (prefix) {
      return `${value / HTML_FONT_SIZE}rem`;
    }

    return value / HTML_FONT_SIZE;
  }

  if (prefix) {
    return `${value}px`;
  }

  return value;
};

export default convertPxToRem;
