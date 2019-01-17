import {createStyles, Theme} from "@material-ui/core";

export const jobTableStyle = (theme: Theme) => createStyles({
  table: {
    minWidth: 700,
  },
  row: {
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    color: theme.palette.action.active,
    '&:hover': {
      color: theme.palette.action.hover
    }
  }
});