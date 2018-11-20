import TabMenu from "./components/tab-menu/TabMenu";
import rootStore from "./store/root-store";
import HomeRoute from "./components/home";
import AddJobRoute from "./components/jobs/add-job-form";
import ClientListRoute from "./components/clients/client-list";
import User from "./components/user/User";
import EditProfileRoute from "./components/user/edit-profile";
import UserOffersRoute from "./components/user/offers";
import "./App.css";

import { Provider } from "mobx-react";
import * as React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Provider {...rootStore}>
          <React.Fragment>
            <Router history={createBrowserHistory()}>
              <React.Fragment>
                <User />
                <header className="App-header">Student Jobs</header>

                <TabMenu viewStore={rootStore.viewStore} />
                <HomeRoute />
                <AddJobRoute />
                <ClientListRoute />
                <EditProfileRoute />
                <UserOffersRoute />
              </React.Fragment>
            </Router>
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default App;
