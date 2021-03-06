import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade, darken} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#832F2E',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: '#2F94D8',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#000',
    alternateTextColor: '#fff',
    canvasColor: '#f8f8f8',
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: '#2F94D8',
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};