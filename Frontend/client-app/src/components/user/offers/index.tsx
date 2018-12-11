import { Route } from "react-router";
import * as React from "react";
import { UserOffers } from "./UserOffers";

export default () => {
  return (
    <React.Fragment>
      <Route path="/user/offers" component={UserOffers} />
    </React.Fragment>
  );
};
