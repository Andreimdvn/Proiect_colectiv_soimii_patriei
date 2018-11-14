import * as React from "react";
import { observer } from "mobx-react";
import { Link, Redirect } from "react-router-dom";
import * as classNames from "classnames";

import { ViewStore } from "src/store/view-store";
import { HeaderTabs } from "src/view-models/header-tabs";

interface Props {
  viewStore: ViewStore;
}

interface State {
  redirectTo: string;
}

@observer
class TabMenu extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { redirectTo: "" };
  }

  private changeActiveTab(tab: HeaderTabs) {
    this.setState({ redirectTo: "" });
    this.props.viewStore.changeActiveHeaderTab(tab);
  }

  isActive(tab: HeaderTabs) {
    return this.props.viewStore.activeHeaderTab === tab;
  }

  private handleRedirect(): React.ReactNode {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return null;
  }

  public render() {
    return (
      <div>
        {this.handleRedirect()}
        <div className="header-tabs">
          <ul className="tabs">
            <li
              className={classNames({
                active: this.isActive(HeaderTabs.home)
              })}
            >
              <Link
                to="/home"
                onClick={() => this.changeActiveTab(HeaderTabs.home)}
              >
                {/* <Icon className="icon-home" icon="home" /> */}
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TabMenu;
