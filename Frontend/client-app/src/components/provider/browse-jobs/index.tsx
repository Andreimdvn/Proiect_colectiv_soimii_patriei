import { Route } from "react-router";
import * as React from "react";
import {BrowseJobs} from "./BrowseJobs";

export default () => {
    return (
        <React.Fragment>
            <Route path="/browse" component={BrowseJobs} />
        </React.Fragment>
    );
};
