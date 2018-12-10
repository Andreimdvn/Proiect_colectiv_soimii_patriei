import {createMuiTheme} from "@material-ui/core";
import {grey, indigo, red, green, deepPurple, blue, blueGrey} from "@material-ui/core/colors";

export const theme = createMuiTheme({ // material ui color palette: https://material-ui.com/style/color/#color-palette
  palette: {
    background: {
      default: grey[900],
      paper: grey[800],
    },
    primary: {
      main: "#374969"
    },
    secondary: {
      main: indigo[500]
    },
    text: {
      primary: grey[100]
    },
    error: {
      main: red.A700
    },
    action: {
      active: deepPurple[100],
      hover: blue[100],
    }
  },
  typography: {
    fontFamily: 'verdana',
    useNextVariants: true
  },
  spacing: {
    unit: 2
  }
});