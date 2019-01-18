import { Route } from "react-router";
import * as React from "react";
import { AddJobForm } from "./AddJobForm";

export default () => {
  return (
    <React.Fragment>
      <Route path="/add" component={AddJobForm} cookies={"cookies"}/>
    </React.Fragment>
  );
};
