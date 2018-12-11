import { Route } from "react-router";
import * as React from "react";
import { EditProfile } from "./EditProfile";

export default () => {
  return (
    <React.Fragment>
      <Route path="/user/edit" component={EditProfile} />
    </React.Fragment>
  );
};
