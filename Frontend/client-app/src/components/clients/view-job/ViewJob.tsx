import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import "./ViewJob.css";
import { Avatar, Chip, GridList, GridListTile, Card, Grid, Button } from "@material-ui/core";
import { propTypes } from "mobx-react";
import { Cookies } from "react-cookie";

let idJob = '';
const cookie = new Cookies();
    
export class ViewJob extends React.Component<any> {
    state = {
        title: '',
        jobDescription: '',
        candidateDescription: '',
        employer: '',
        payment: '',
        address: '',
        jobType: '',
        Tags: ['tag1']
    }

    async getJob() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const tokenProvider = cookie.get('token');
        const data = {
          token: tokenProvider
        };

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        };


      console.log("Get job " +options);

        const request = new Request('http://localhost:16000/job/' + idJob ,options);

        const response = await fetch(request).then(res => {
            res.json().then(r => {
                console.log(r);
                if (r.status === 0) {
                    console.log("Success");
                    const fields = r.response;
                    this.setState({
                        title: fields.title,
                        jobDescription: fields.jobDescription,
                        candidateDescription: fields.candidateDescription,
                        employer: fields.employer,
                        payment: fields.payment,
                        address: fields.address,
                        jobType: fields.jobType,
                        Tags: fields.tags,
                    });
                } else if (r.status === -1) {
                    alert(r.response)
                }
            });
        });

        console.log(response);
    }
    
    constructor(props : any) {
        super(props);

        console.log(props);
        idJob = this.props.idJob;
        idJob = window.location.href.split('/').slice(-1)[0];

        console.log('Id job is : ' + idJob);
        this.getJob();
    }

    async handleApplyJob() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const tokenProvider = cookie.get('token');
    
        const data = {
            token: tokenProvider,
            job_id: idJob
        };
        
        console.log(tokenProvider);

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('http://localhost:16000/api/request_job',options);

        const response = await fetch(request).then(res => {
            res.json().then(r => {
                console.log(r);
                if (r.status === 0) {
                    alert("Your request has been sent to the client!");
                } else if (r.status === -1) {
                    alert(r.response)
                }
            });
        });
    }

    render() : React.ReactNode {
        return (
            <div className="mainDiv">
                <Grid container={true} spacing={8} direction = "row">
                    <Grid item={true} xs = {10}>
                        <Card className = "card">
                            <Typography style={{height: 20}} component="h1" variant="h1">
                                {this.state.title}
                            </Typography><br/>
                        </Card>
                    </Grid>
                    <Grid item={true} xs = {2}>
                        <Card className = "card">
                        <ul className= "ul">
                            {    
                                this.state.Tags.map((tagName, index) => (
                                    <li key={index} className = "li"><Chip color="secondary" label = {tagName} avatar={<Avatar>{tagName.slice(0,2).toUpperCase()}</Avatar>} variant="outlined"/></li>
                                    )
                                )
                            }
                            </ul>
                        </Card>
                    </Grid>
                    
                    <Grid item={true} xs = {2}>
                       <Card className = "cardMain">
                            <br/>
                            <ul className= "ul">
                                <li className = "li">
                                    Employer: {this.state.employer}
                                </li>
                                <br/>
                                <li>
                                    Job type: {this.state.jobType}
                                </li>
                                <br/>
                                <li>
                                    Payment: {this.state.payment}
                                </li>
                                <br/>
                                <li>
                                Address: {this.state.address}
                                </li>
                            </ul>
                            
                            <Button onClick={this.handleApplyJob} className="button"
                            variant="contained"
                            color="secondary">
                                Apply for job
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item={true} xs = {5}>
                        <Card className = "cardMain">
                            <Typography style={{height: 20}} component="h1" variant="h4">
                                Job Description
                            </Typography>
                            <br/>
                            <br/>
                            
                            {this.state.jobDescription}
                        </Card>
                     </Grid>   
                    <Grid item={true} xs = {5}>
                        <Card className = "cardMain">
                            <Typography style={{height: 20}} component="h1" variant="h4">
                                Candidate Description
                            </Typography>
                            <br/>
                            <br/>
                            
                            {this.state.candidateDescription}
                        </Card>
                    </Grid>
                </Grid>
        </div>
    );
    }
}
