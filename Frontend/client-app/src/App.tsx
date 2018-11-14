import TabMenu from "./components/tab-menu/TabMenu";
import rootStore from "./store/root-store";
import HomeRoute from "./components/home";

import { Provider } from "mobx-react";
import * as React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">Student Jobs</header>
        <Provider {...rootStore}>
          <React.Fragment>
            <Router history={createBrowserHistory()}>
              <React.Fragment>
                <TabMenu viewStore={rootStore.viewStore} />
                <HomeRoute />
              </React.Fragment>
            </Router>
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default App;
