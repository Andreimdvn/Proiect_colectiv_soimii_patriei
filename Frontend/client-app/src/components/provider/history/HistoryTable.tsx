import * as React from "react";
import {Job} from "../../../view-models/Job";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/core';
import {JobsTableCell} from "../browse-jobs/JobsTableCell";
import {Link} from "react-router-dom";
import {jobTableStyle} from "../job-table-style";

interface Props extends StyledComponentProps{
  jobs:Job[]
}

export const HistoryTable = withStyles(jobTableStyle)(
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
                <JobsTableCell>Finished at</JobsTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.jobs.map(job =>{
                return (
                  <TableRow key={job.id} className={classes.row}>
                    <JobsTableCell>{job.type}</JobsTableCell>
                    <JobsTableCell>{job.descriptionPreview}</JobsTableCell>
                    <JobsTableCell>{job.reward}</JobsTableCell>
                    <JobsTableCell><Link to={"/user/"+job.publisher} className={classes.link}>{job.publisher}</Link></JobsTableCell>
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
