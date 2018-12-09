import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";
import {RecommendedJobsTable} from "../provider/recommended-jobs/RecommendedJobsTable";
import {Job} from "../../view-models/Job";

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
          <div>Recommended for you:</div><br/>
          <RecommendedJobsTable jobs={[
            new Job("1", "cleaning", "clean my house", "you dad", "dinner", "20-09-2018"),
            new Job("2", "dog walk", "walk good boie", "you mom", "5", "23-09-2018"),
            new Job("3", "kid", "take care of my toddler", "you sister", "12", "30-09-2018"),
          ]}/>
          <div>*history*</div><br/>
        </React.Fragment>
    );
  }
}
