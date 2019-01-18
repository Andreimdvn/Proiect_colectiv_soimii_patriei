import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/core';
import {jobPageStyle} from "../recommended-jobs/job-page-style";
import {Job} from "../../../view-models/Job";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import {jobFilterStyle} from "./JobFilterStyle";
import Input from "@material-ui/core/es/Input/Input";

interface Props extends StyledComponentProps{
  onFilterCallback: any
}

interface State {
  type: string
}

export const JobFilter = withStyles(jobFilterStyle)(
  class RecommendedJobsTableBase extends React.Component<Props, State> {
    constructor(props) {
      super(props);

      this.state = {type: 'any'};
    }

    doFilter(callback) {
      // todo get things from state params

      const jobs = [
        new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
        new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
        new Job("3", "kid", "Lorem ipsum dolor sit amet, consectetur adipiscing el", "xfg45", "12", "30-09-2018"),
        new Job("4", "kid", "a vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id imperdiet ipsum tristique sit amet. Proin bibendum dui in ultricies euismod. Nunc ", "xfg45", "12", "30-09-2018"),
        new Job("5", "kid", "mentum aliquet purus", "xfg45", "12", "30-09-2018"),
        new Job("6", "kid", "am nunc. Ut viverra massa vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id impe", "xfg45", "12", "30-09-2018"),
        new Job("7", "kid", "", "xfg45", "12", "30-09-2018"),
      ];

      callback(jobs);
    }

    onChangeType = event => {
      this.setState({ type: event.target.value });
    };

    render() {
      const {classes} = this.props;

      return (
        <React.Fragment>
          <Grid container={true}>
            <Grid item={true} xs={1}>
              <Typography className={classes.label}>Job type</Typography>

            </Grid>
            <Grid item={true} xs={1}>
              <Select
                value={this.state.type}
                onChange={this.onChangeType}
                inputProps={{
                  name: 'type',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={'any'}>Any</MenuItem>
                <MenuItem value={'partTime'}>Part time</MenuItem>
                <MenuItem value={'fullTime'}>Full time</MenuItem>
              </Select>
            </Grid>

            <Grid item={true} xs={1}/>


            <Grid item={true} xs={2}>
              <Input
                placeholder="Tags"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Description',
                }}
              />
            </Grid>

            <Grid item={true} xs={1}/>


            <Grid item={true} xs={3}>
              <Input
                placeholder="Description"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Description',
                }}
              />
            </Grid>

            <Grid item={true} xs={1}>
              <button>Search</button>
            </Grid>

            </Grid>


        </React.Fragment>
      );
    }
});


