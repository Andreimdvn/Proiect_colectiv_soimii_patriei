import TabMenu from "./components/tab-menu/TabMenu";
import rootStore from "./store/root-store";
import HomeRoute from "./components/home";
import AddJobRoute from "./components/jobs/add-job-form";
import "./App.css";

import { Provider } from "mobx-react";
import * as React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import {Register} from "./components/register/Register";

const logged = false;
class App extends React.Component {

  public render() {
    return (

      <div className="App">
          <Provider {...rootStore}>
          {logged ? (
          <React.Fragment>
              <header className="App-header">Student Jobs</header>
            <Router history={createBrowserHistory()}>
              <React.Fragment>
                <TabMenu viewStore={rootStore.viewStore} />
                <HomeRoute />
                <AddJobRoute />
              </React.Fragment>
            </Router>
          </React.Fragment>
          ): (
              <React.Fragment>
                <Register/>
              </React.Fragment>
              )}
          </Provider>
      </div>
    );
  }
}
export default App;
