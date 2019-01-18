import { Route } from "react-router";
import * as React from "react";
import { Login } from "./Login";

export default () => {
  return (
    <React.Fragment>
      <Route exact={true} path="/login" component={Login} />
    </React.Fragment>
  );
};
