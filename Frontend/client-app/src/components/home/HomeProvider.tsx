import * as React from "react";
import { inject, observer } from "mobx-react";

import { ViewStore } from "src/store/view-store";

import {Job} from "../../view-models/Job";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from "../../themes/main-theme";
import Typography from "@material-ui/core/Typography/Typography";
import "./home-provider.css";
import {Cookies, withCookies} from "react-cookie";
import {JobsPage} from "../provider/recommended-jobs/JobsPage";

interface Props {
  viewStore: ViewStore;
  cookies: Cookies;
}

@inject("viewStore")
@observer
class HomeProviderBase extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getToken() {
    return this.props.cookies.get("token");
  }

  getRecommendedJobs() {

    const jsonCfg = require('src/app_properties.json');
    const requestUrl = jsonCfg.baseUrl + "jobs/";
    const token = this.getToken();

    const body = {token: "asd"}; // fixme token

    const promisedResponse = fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body)
    });

    promisedResponse.then(response => response.json()).then(json =>{
      console.log(json);
    }).catch(error=> {
      console.log(error);
    });

    return [
      new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
      new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
      new Job("3", "kid", "Lorem ipsum dolor sit amet, consectetur adipiscing el", "xfg45", "12", "30-09-2018"),
      new Job("4", "kid", "a vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id imperdiet ipsum tristique sit amet. Proin bibendum dui in ultricies euismod. Nunc ", "xfg45", "12", "30-09-2018"),
      new Job("5", "kid", "mentum aliquet purus", "xfg45", "12", "30-09-2018"),
      new Job("6", "kid", "am nunc. Ut viverra massa vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id impe", "xfg45", "12", "30-09-2018"),
      new Job("7", "kid", "", "xfg45", "12", "30-09-2018"),
    ];
  }

  getHistory() {
    const jsonCfg = require('src/app_properties.json');
    const requestUrl = jsonCfg.baseUrl + "/history/";
    const token = this.getToken();

    const promisedResponse = fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "token=" + token
    });


    promisedResponse.then(response => response.json()).then(json =>{
      console.log(json);
    }).catch(error=> {
      console.log(error);
    });

    return [
      new Job("4", "cleaning", "cleaned house", "xfg45", "dinner", "10-09-2018"),
      new Job("5", "dog walk", "walked good boie", "xfg45", "5", "13-09-2018"),
    ];
  }

  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme = {theme}>


            <Typography component="h1" variant="h4">
              Recommended for you
            </Typography>
            <JobsPage jobs={this.getRecommendedJobs()}/>

            <Typography component="h1" variant="h5">
              History
            </Typography>
            <JobsPage jobs={this.getHistory()}/>

      </MuiThemeProvider>

    );
  }
}

export const HomeProvider = withCookies(HomeProviderBase); // withCookies adds this.props.cookies
