import {createStyles, Theme} from "@material-ui/core";

export const jobCardStyle = (theme: Theme) => createStyles({
  card: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 200
  },
  typography: {
    color: theme.palette.text.primary,
    textAlign: "justify",
    paddingRight: 30,
    paddingLeft: 30,
  },
  publisherText: {
    color: theme.palette.text.primary,
    fontStyle: 'italic',
    textAlign: "right",
    paddingRight: 15,
    paddingTop: 15
  },
  applyButton: {
    color: theme.palette.action.active,
    '&:hover': {
      color: theme.palette.action.hover
    }
  }
});