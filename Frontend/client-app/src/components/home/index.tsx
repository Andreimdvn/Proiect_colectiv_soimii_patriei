import { Route } from "react-router-dom";
import * as React from "react";
import { Home } from "./Home";

export default () => {
  return (
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/home" component={Home} />
    </div>
  );
};
