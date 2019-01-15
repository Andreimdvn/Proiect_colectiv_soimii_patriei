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
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={3}>
            <Grid container={true} spacing={16} direction="column">
              <JobCard job={new Job('12', 'Fain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'non proident, sunt in culpa qui offici', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'elit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', ' ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'ugiat nulla pariatur. Excepteur sint occaecat cupidatat', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', ' ullamco laboris nisi ut aliquip ex ea comm', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ', 'pub', '120 eur', '12-10-2018')}/>
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <Grid container={true} spacing={16} direction="column">
              <JobCard job={new Job('12', 'Fain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'non proident, sunt in culpa qui offici', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'ecat cupidatat non proid', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'uat. Duis aute i', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'ugiat nulla pariatur. Excepteur sint occaecat cupidatat', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ', 'pub', '120 eur', '12-10-2018')}/>
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <Grid container={true} spacing={16} direction="column">
              <JobCard job={new Job('12', 'Fain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'non proident, sunt in culpa qui offici', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'ecat cupidatat non proid', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'uat. Duis aute i', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'ugiat nulla pariatur. Excepteur sint occaecat cupidatat', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', ' ullamco laboris nisi ut aliquip ex ea comm', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ', 'pub', '120 eur', '12-10-2018')}/>
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <Grid container={true} spacing={16} direction="column">
              <JobCard job={new Job('12', 'Fain', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'non proident, sunt in culpa qui offici', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'rit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', ' ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non pr', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'ecat cupidatat non proid', 'pub', '120 eur', '12-10-2018')}/>
              <JobCard job={new Job('12', 'Fain', 'uat. Duis aute i', 'pub', '120 eur', '12-10-2018')}/>
            </Grid>
          </Grid>
        </Grid>
    );
    }
    }
    );
