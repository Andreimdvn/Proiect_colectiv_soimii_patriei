import { Route } from "react-router-dom";
import * as React from "react";
import { HomeClient } from "./HomeClient";
import {HomeProvider} from "./HomeProvider";

export default {
  clientHome() {
    console.log("client home");
    return (
      <div>
        <Route exact={true} path="/" component={HomeClient} />
        <Route exact={true} path="/home" component={HomeClient} />
      </div>
    );
  },

  providerHome() {
    console.log("provider home");
    return (
      <div>
        <Route exact={true} path="/" component={HomeProvider} />
        <Route exact={true} path="/home" component={HomeProvider} />
      </div>
    );
  }
};
