import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";
import {RecommendedJobsTable} from "../provider/recommended-jobs/RecommendedJobsTable";
import {Job} from "../../view-models/Job";
import Paper from "@material-ui/core/Paper/Paper";

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
      <React.Fragment>
        <Paper className="paper">
          <div>Recommended for you:</div><br/>
          <RecommendedJobsTable jobs={[
            new Job("1", "cleaning", "clean my house", "your dad", "dinner", "20-09-2018"),
            new Job("2", "dog walk", "walk good boie", "your mom", "5", "23-09-2018"),
            new Job("3", "kid", "take care of my toddler", "your sister", "12", "30-09-2018"),
          ]}/>
        </Paper>
        <div>*history*</div><br/>
      </React.Fragment>
    );
  }
}
