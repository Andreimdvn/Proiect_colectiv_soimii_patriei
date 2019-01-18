import { Route } from "react-router";
import * as React from "react";
import { MyApplications} from "./my-applications";

export default () => {
    return (
        <React.Fragment>
            <Route path="/user/applications" component={MyApplications} />
         </React.Fragment>
);
};
