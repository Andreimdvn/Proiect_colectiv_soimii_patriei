import { Route } from "react-router";
import * as React from "react";
import { ViewJob } from "./ViewJob";

export default () => {
  return (
    <React.Fragment>
      <Route path="/job/:id" component={ViewJob} />
    </React.Fragment>
  );
};
