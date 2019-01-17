import { Route } from "react-router";
import * as React from "react";
import { ClientList } from "./ClientList";

export default () => {
  return (
    <React.Fragment>
      <Route path="/clients" component={ClientList} />
    </React.Fragment>
  );
};
