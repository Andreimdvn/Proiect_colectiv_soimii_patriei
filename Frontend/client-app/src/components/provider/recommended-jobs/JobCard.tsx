import * as React from "react";
import { Job } from "../../../view-models/Job";
import { withStyles } from "@material-ui/core/styles";
import { StyledComponentProps } from "@material-ui/core";
import { jobCardStyle } from "./job-card-style";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import viewJob from "src/components/clients/view-job";
import { Route, Redirect } from "react-router";

interface State {
  redirect: React.ReactNode;
}

interface Props extends StyledComponentProps {
  job: Job;
}

export const JobCard = withStyles(jobCardStyle)(
  class RecommendedJobsTableBase extends React.Component<Props, State> {
    constructor(props) {
      super(props);
      this.state = {
        redirect: undefined
      };
    }

    render() {
      const { classes } = this.props;

      return this.state.redirect ? (
        this.state.redirect
      ) : (
        <a href="localhost:3000/job/id">
          <Grid
            item={true}
            xs={12}
            onClick={() => {
              this.setState(
                { redirect: <Redirect to={"/job/" + this.props.job.id} /> },
                () => {
                  this.setState({ redirect: undefined });
                }
              );
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    className={classes.typography}
                    gutterBottom={true}
                  >
                    {this.props.job.type}
                  </Typography>
                  <Typography
                    className={classes.typography}
                    variant="h5"
                    component="h2"
                  >
                    {this.props.job.descriptionPreview}
                  </Typography>
                  <Typography
                    className={classes.publisherText}
                    color="textSecondary"
                  >
                    Published by {this.props.job.publisher}
                  </Typography>
                  <Grid container={true}>
                    <Grid item={true} xs={6}>
                      <Typography className={classes.typography} component="p">
                        {this.props.job.reward} euro
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={6}>
                      <Typography
                        className={classes.publisherText}
                        component="p"
                      >
                        {this.props.job.date}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </a>
      );
    }
  }
);
