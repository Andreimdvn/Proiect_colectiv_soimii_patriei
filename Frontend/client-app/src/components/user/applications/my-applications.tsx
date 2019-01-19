import * as React from "react";
import {ApplicationView} from "./application-view/ApplicationView";
import {inject, observer} from "mobx-react";
import Grid from "@material-ui/core/Grid/Grid";
import "./my-applications.css";
import {ApplicationStore} from "../../../store/application-store";
import Cookies from "universal-cookie/lib/Cookies";

interface Props {
    applicationStore: ApplicationStore
}

@inject("applicationStore")
@observer
export class MyApplications extends React.Component<Props, any>{
    store = this.props.applicationStore;

    async getApplications(token){
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        const data = {
            token: {}
        };
        data.token = token;

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('http://localhost:16000/api/jobs_for_provider',options);

        await fetch(request).then(res => {
            res.json().then(r => {
                console.log("response:",r);
                this.setState({applications: r.response});
            });
        }).catch(error=>console.log("Eroare de sistem"))
    }

    constructor(props){
        super(props);
        this.state ={
            applications: []
        };
        const cookies = new Cookies();
        const token = cookies.get("token");
        this.getApplications(token);
    }

    render() {
        return (
            <div className={"container"} >
                <Grid container={true} spacing={24}>
                    <Grid item={true} xs={2}/>
                    <Grid item={true} xs={8} >
                        {this.state.applications.map((d,idx)=> {
                            return (<ApplicationView key={d.id} title={d.title} date={d.date} id={d.id}/>)
                        }
                        )}
                    </Grid>
                    <Grid item={true} xs={2}/>
                </Grid>
            </div>
        );
    }
}