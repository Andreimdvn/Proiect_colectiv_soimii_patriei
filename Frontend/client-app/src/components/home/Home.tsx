import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return <div>Homepage</div>;
  }
}
