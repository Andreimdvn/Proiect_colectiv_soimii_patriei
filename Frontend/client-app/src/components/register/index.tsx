import { Route } from "react-router";
import * as React from "react";
import {Register} from "./Register";

export default () => {
    return (
        <React.Fragment>
            <Route path="/register" component={Register} />
        </React.Fragment>
    );
};
