import * as React from "react";
import {ApplicationView} from "./application-view/ApplicationView";
import {inject, observer} from "mobx-react";
import Grid from "@material-ui/core/Grid/Grid";
import "./my-applications.css";

@inject("applicastionStore")
@observer
export class MyApplications extends React.Component<any>{
    state = {
        applications: [1,2,3]
    };

    render() {
        return (
            <div className={"container"}>
                <Grid container={true} spacing={24}>
                    <Grid item={true} xs={3}/>
                    <Grid item={true} xs={6}>
                        {this.state.applications.map((d,idx)=> {
                            return (<ApplicationView key={d} title={"t"} email={"e"} date={"d"}/>)
                        }
                        )}
                    </Grid>
                    <Grid item={true} xs={3}/>
                </Grid>
            </div>
        );
    }
}