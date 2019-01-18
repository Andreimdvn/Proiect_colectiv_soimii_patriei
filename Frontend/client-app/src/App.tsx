import TabMenu from "./components/tab-menu/TabMenu";
import rootStore from "./store/root-store";
import BrowseRoute from "./components/provider/browse-jobs";
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
import { withCookies} from "react-cookie";
import Cookies from "universal-cookie";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";

import { TabMenuProps } from "./components/tab-menu/TabMenuProps";
import { HeaderTabs } from "./view-models/header-tabs";
import { UserTypes } from "./view-models/user-types";
import history from "./history";

interface Props {
  cookies: Cookies;
}

class App extends React.Component<Props> {
  state = {
    showLoginWindow: true,
    redirect: undefined
  };
  constructor(props) {
    super(props);

    this.handler.bind(this);
  }
  handler = () => {
    let destinationURL;
    if (this.state.showLoginWindow) {
      console.log("toRegister");
      destinationURL = "/register";
      history.push("/register");
    } else {
      console.log("toLogin");
      destinationURL = "/login";
      history.push("/login");
    }
    // this.setState({ redirect: <Redirect to={destinationURL} /> }, () => {
    //   this.setState({ redirect: undefined });
    // });
    this.setState({
      showLoginWindow: !this.state.showLoginWindow
    });
  };

  public render() {
    // try to load the cookies
    const cookies = new Cookies();
    const token = cookies.get("token");
    const userType = cookies.get("userType");
    console.log(token);
    const logged =
      token !== undefined &&
      userType !== undefined &&
      token !== "" &&
      userType !== "";

    return (
      <div className="App">
        <Provider {...rootStore}>
          <Router history={history}>
            <React.Fragment>
              {/*{!logged ? ( // if not logged in, show the register screen*/}
                {/*this.state.showLoginWindow ? (*/}
                  {/*<Login*/}
                    {/*cookies = {this.props.cookies}*/}
                    {/*switchScreen={this.handler}*/}
                  {/*/>*/}
                {/*) : (*/}
                  {/*<Register switchScreen={this.handler} />*/}
                {/*)*/}
              {/*) : // <React.Fragment>*/}
              {/*//   <Login />*/}
              {/*//   <Register />*/}
              {/*// </React.Fragment>*/}
              {/*null}*/}

              {userType === UserTypes.CLIENT ? ( // client home page
                <React.Fragment>
                  {/* <Router history={createBrowserHistory()}> */}
                  <React.Fragment>
                    <User cookies={this.props.cookies}/>
                    <header className="App-header">Student Jobs</header>

                    <TabMenu
                      viewStore={rootStore.viewStore}
                      menuOptions={[
                        new TabMenuProps(HeaderTabs.home, "/home", "Home"),
                        new TabMenuProps(HeaderTabs.add, "/add", "Add a job"),
                        new TabMenuProps(
                          HeaderTabs.clients,
                          "/clients",
                          "Other clients"
                        )
                      ]}
                    />
                    <HomeRoute.clientHome />
                    <AddJobRoute />
                    <ClientListRoute />
                    <EditProfileRoute />
                    <UserOffersRoute />
                  </React.Fragment>
                  {/* </Router> */}
                </React.Fragment>
              ) : null}

              {userType === UserTypes.PROVIDER ? ( // provider home page
                <React.Fragment>
                  {/* <Router history={createBrowserHistory()}> */}
                  <React.Fragment>
                    <User cookies={this.props.cookies}/>
                    <header className="App-header">Provider screen</header>

                    <TabMenu
                      viewStore={rootStore.viewStore}
                      menuOptions={[
                        new TabMenuProps(HeaderTabs.home, "/home", "Home"),
                        new TabMenuProps(HeaderTabs.browse, "/browse", "Browse")
                      ]}
                    />
                    <HomeRoute.providerHome />
                    <BrowseRoute />
                    <EditProfileRoute />
                    <UserOffersRoute />
                  </React.Fragment>
                  {/* </Router> */}
                </React.Fragment>
              ) : null}
            </React.Fragment>
          </Router>
        </Provider>
      </div>
    );
  }
}
export default withCookies(App); // withCookies adds this.props.cookies
