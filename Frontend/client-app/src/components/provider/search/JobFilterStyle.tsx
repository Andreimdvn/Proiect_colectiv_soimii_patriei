import {createStyles, Theme} from "@material-ui/core";

export const jobFilterStyle = (theme: Theme) => createStyles({
  container: {
    marginTop: 20,
    backgroundColor: theme.palette.background.default,
  },
  label: {
    textAlign: 'right',
    paddingTop: 7
  },
  searchButton: {
    paddingTop: 5
  }

});