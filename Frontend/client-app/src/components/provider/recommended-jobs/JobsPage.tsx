import * as React from "react";
import {Job} from "../../../view-models/Job";
import { withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/core';
import {jobPageStyle} from "./job-page-style";
import Grid from '@material-ui/core/Grid';
import {JobCard} from "./JobCard";

interface Props extends StyledComponentProps{
  jobs:Job[]
}

export const JobsPage = withStyles(jobPageStyle)(
  class RecommendedJobsTableBase extends React.Component<Props> {
    constructor(props) {
      super(props);
    }

    render() {
      const {classes} = this.props;

      return (
        <Grid container={true} spacing={24} className={classes.container}>
          {[0, 1, 2, 3].map(value => ( // 4 columns, each needs its own key
            <Grid item={true} xs={3} spacing={24} key={value}>
              <Grid container={true} spacing={24} direction="column">
                {this.props.jobs.map((job, index) =>{
                  if(index >= value / 4 * this.props.jobs.length && index < (value + 1) / 4 * this.props.jobs.length) // only display the jobs that should appear in the current column
                    return (<JobCard key={job.id} job={job}/>);
                  else
                    return;
                })}
              </Grid>
            </Grid>
          ))}


        </Grid>
    );
    }
    }
    );
