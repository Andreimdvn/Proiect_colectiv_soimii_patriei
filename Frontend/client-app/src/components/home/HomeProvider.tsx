import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";

import {Job} from "../../view-models/Job";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from "../../themes/main-theme";
import "./home-provider.css";
import {Cookies, withCookies} from "react-cookie";
import {JobsPage} from "../provider/recommended-jobs/JobsPage";
import {JobFilter} from "../provider/search/JobFilter";

interface Props {
  viewStore: ViewStore;
  cookies: Cookies;
}

interface State {
  jobs: Job[]
}

@inject("viewStore")
@observer
class HomeProviderBase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {jobs: []}
  }

  componentDidMount() {
    this.updateJobs();
  }

  getToken() {
    return this.props.cookies.get("token");
  }

  updateJobs() {

    const jsonCfg = require('src/app_properties.json');
    const requestUrl = jsonCfg.baseUrl + "jobs";
    const token = this.getToken();

    const body = {token: "asd"}; // fixme token

    const promisedResponse = fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    promisedResponse.then(response => response.json()).then(json =>{
      if(json.status === 0) {
        this.setState({jobs: json.response});
      }
      else {
        console.log("ceva a crapat");
      }
    }).catch(error=> {
      console.log(error);
    });

    /*return [
      new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
      new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
      new Job("3", "kid", "Lorem ipsum dolor sit amet, consectetur adipiscing el", "xfg45", "12", "30-09-2018"),
      new Job("4", "kid", "a vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id imperdiet ipsum tristique sit amet. Proin bibendum dui in ultricies euismod. Nunc ", "xfg45", "12", "30-09-2018"),
      new Job("5", "kid", "mentum aliquet purus", "xfg45", "12", "30-09-2018"),
      new Job("6", "kid", "am nunc. Ut viverra massa vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id impe", "xfg45", "12", "30-09-2018"),
      new Job("7", "kid", "", "xfg45", "12", "30-09-2018"),
    ];*/
  }


  setJobsCallback = (jobs: Job[]) => {
    this.setState({jobs});
  };

  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme = {theme}>
          <JobFilter onFilterCallback={this.setJobsCallback}/>

          <JobsPage jobs={this.state.jobs}/>
      </MuiThemeProvider>
    );
  }
}

export const HomeProvider = withCookies(HomeProviderBase); // withCookies adds this.props.cookies
