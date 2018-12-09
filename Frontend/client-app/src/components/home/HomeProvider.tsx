import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";

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
          <div>Homepage provider</div><br/>
          <div>*recommended jobs*</div><br/>
          <div>*history*</div><br/>
        </React.Fragment>
    );
  }
}
