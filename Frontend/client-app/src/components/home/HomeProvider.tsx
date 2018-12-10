import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";
import {RecommendedJobsTable} from "../provider/recommended-jobs/RecommendedJobsTable";
import {Job} from "../../view-models/Job";
import Paper from "@material-ui/core/Paper/Paper";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from "../../themes/main-theme";
import Typography from "@material-ui/core/Typography/Typography";
import {HistoryTable} from "../provider/history/HistoryTable";
import "./home-provider.css";

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export class HomeProvider extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme = {theme}>

        <React.Fragment>

          <Paper className={"paper"}>
            <Typography component="h1" variant="h5">
              Recommended for you
            </Typography>
            <RecommendedJobsTable jobs={[
              new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
              new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
              new Job("3", "kid", "take care of my toddler!!", "xfg45", "12", "30-09-2018"),
            ]}/>
          </Paper>

          <Paper className={"paper"}>
            <Typography component="h1" variant="h5">
              History
            </Typography>
            <HistoryTable jobs={[
              new Job("4", "cleaning", "cleaned house", "xfg45", "dinner", "10-09-2018"),
              new Job("5", "dog walk", "walked good boie", "xfg45", "5", "13-09-2018"),
            ]}/>
          </Paper>

        </React.Fragment>
      </MuiThemeProvider>

    );
  }
}
