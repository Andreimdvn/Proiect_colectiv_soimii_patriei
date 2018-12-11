import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell/TableCell";

export const JobsTableCell = withStyles(theme => ({
  head: {
    backgroundColor:theme.palette.primary.main,
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);