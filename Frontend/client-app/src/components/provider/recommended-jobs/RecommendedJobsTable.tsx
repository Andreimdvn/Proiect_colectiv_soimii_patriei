import * as React from "react";
import {Job} from "../../../view-models/Job";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Theme } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const JobsTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.background,
    color: theme.palette.text,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    backgroundColor: theme.palette.background.default
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

interface Props extends WithStyles<typeof styles>{
  jobs:Job[]
}

export const RecommendedJobsTable = withStyles(styles)(
  class RecommendedJobsTableBase extends React.Component<Props> {
    constructor(props) {
      super(props);
    }

    render() {
      const {classes} = this.props;

      return (
        <React.Fragment>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <JobsTableCell>Type</JobsTableCell>
                <JobsTableCell>Description</JobsTableCell>
                <JobsTableCell>Reward</JobsTableCell>
                <JobsTableCell>Publisher</JobsTableCell>
                <JobsTableCell>Date</JobsTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.jobs.map(job =>{
                return (
                  <TableRow key={job.id}>
                    <JobsTableCell>{job.type}</JobsTableCell>
                    <JobsTableCell>{job.descriptionPreview}</JobsTableCell>
                    <JobsTableCell>{job.reward}</JobsTableCell>
                    <JobsTableCell>{job.publisher}</JobsTableCell>
                    <JobsTableCell>{job.date}</JobsTableCell>
                  </TableRow>
                );
              })}
            </TableBody>

          </Table>
        </React.Fragment>
      );
    }
  }
);
