import { Route } from "react-router";
import * as React from "react";
import { ApplicantList } from "./ApplicantList";

export default () => {
  return (
    <React.Fragment>
      <Route path="/user/applicants" component={ApplicantList} />
    </React.Fragment>
  );
};
