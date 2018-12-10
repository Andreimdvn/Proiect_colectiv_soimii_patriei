import {createMuiTheme} from "@material-ui/core";
import {grey, indigo, red} from "@material-ui/core/colors";

export const theme = createMuiTheme({ // material ui color palette: https://material-ui.com/style/color/#color-palette
  palette: {
    background: {
      default: grey[900],
      paper: grey[800],
    },
    primary: {
      main: indigo[800]
    },
    secondary: {
      main: indigo[400]
    },
    text: {
      primary: grey[100]
    },
    error: {
      main: red.A700
    }
  },
  typography: {
    fontFamily: 'verdana'
  }

  // spacing: {
  //   unit: 4
  // }
});