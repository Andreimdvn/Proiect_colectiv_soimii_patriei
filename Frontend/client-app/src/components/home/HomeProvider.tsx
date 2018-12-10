import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";
import {RecommendedJobsTable} from "../provider/recommended-jobs/RecommendedJobsTable";
import {Job} from "../../view-models/Job";
import Paper from "@material-ui/core/Paper/Paper";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
    const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

    return (
      <React.Fragment>
        <Paper className="paper">
          <div>Recommended for you:</div><br/>
          <MuiThemeProvider theme = {theme}>
            <RecommendedJobsTable jobs={[
              new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
              new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
              new Job("3", "kid", "take care of my toddler!!", "xfg45", "12", "30-09-2018"),
            ]}/>
          </MuiThemeProvider>
        </Paper>
        <div>*history*</div><br/>
      </React.Fragment>
    );
  }
}
