import * as React from "react";
import {Job} from "../../../view-models/Job";
import { withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/core';
import {jobCardStyle} from "./job-card-style";
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface Props extends StyledComponentProps{
  job:Job
}


export const JobCard = withStyles(jobCardStyle)(
  class RecommendedJobsTableBase extends React.Component<Props> {
    constructor(props) {
      super(props);
    }

    render() {
      const {classes} = this.props;

      return (
        <Grid item={true} xs={12}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography className={classes.typography} gutterBottom={true}>
                  {this.props.job.type}
                </Typography>
                <Typography className={classes.typography} variant="h5" component="h2">
                  {this.props.job.descriptionPreview}
                </Typography>
                <Typography className={classes.publisherText} color="textSecondary">
                  Published by {this.props.job.publisher}
                </Typography>
                <Grid container={true}>
                  <Grid item={true} xs={6}>
                    <Typography className={classes.typography} component="p">
                      {this.props.job.reward}
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={6}>
                    <Typography className={classes.publisherText} component="p">
                      {this.props.job.date}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    }
  }
);
