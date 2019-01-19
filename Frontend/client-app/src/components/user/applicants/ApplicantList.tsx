import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "src/store/view-store";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import "./applicants.css";
import { Cookies } from "react-cookie";
import Application from "./ApplicantViewModel";
import applicants from ".";
import {Redirect} from "react-router";

interface Props {
  viewStore: ViewStore;
}

interface State {
  applicantsList: Application[];
  redirect: any;
}

@inject("viewStore")
@observer
export class ApplicantList extends React.Component<Props, State> {
  // private applicants = [
  //   new Application(
  //     "Applicant1",
  //     "Applicant1",
  //     "18-01-2019",
  //     "JobTitle",
  //     "Lorem ipsum dolor sit amet, l semper nisl luctus. Mauris ut tellus luctus, vulputate nunc sed, suscipit odio. Ut congue ultrices porttitor. Sed nec turpis risus. "
  //   ),
  //   new Application(
  //     "Applicant1",
  //     "Applicant1",
  //     "18-01-2019",
  //     "JobTitle",
  //     "Lorem ipsum dolor sit amet, l semper nisl luctus. Mauris ut tellus luctus, vulputate nunc sed, suscipit odio. Ut congue ultrices porttitor. Sed nec turpis risus. "
  //   ),
  //   new Application(
  //     "Applicant1",
  //     "Applicant1",
  //     "18-01-2019",
  //     "JobTitle",
  //     "Lorem ipsum dolor sit amet, l semper nisl luctus. Mauris ut tellus luctus, vulputate nunc sed, suscipit odio. Ut congue ultrices porttitor. Sed nec turpis risus. "
  //   )
  // ];

  constructor(props: Props) {
    super(props);
    this.state = { applicantsList: [], redirect: undefined };
    this.getApplicants();
  }

  getApplicants = async () => {
    const cookies = new Cookies();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ token: cookies.get("token") })
    };

    const request = new Request(
      "http://localhost:16000/api/applicants",
      options
    );

    const response = await fetch(request).then(res => {
      res.json().then(r => {
        if (r.status === 0) {
          const applicantsResp = [];
          r.response.map(a => {
            applicantsResp.push(
              new Application(
                a.first_name,
                a.last_name,
                a.assigned_date.substr(0, a.assigned_date.indexOf(" ")),
                a.title,
                a.description,
                a.provider_id,
                a.job_id,
                  a.email
              )
            );
          });
          this.setState({ applicantsList: applicantsResp });
        } else if (r.status === -1) {
          console.log("fail");
        }
      });
    });
  };

  goToJob = (idJob) => (event) => {
    this.setState({redirect: <Redirect to={/job/ + idJob}/>}, () => {
      this.setState({redirect: undefined})
    })
  }

  render() {
    return this.state.redirect ? this.state.redirect :
        this.state.applicantsList.map((a, index) => (
      <div key={index} className="applicantCard">
        <Card>
          <div className="leftCardApplicant">
            <div className="avatar">
              <Avatar alt="avatar">
                <FaceIcon />
              </Avatar>
            </div>
            <Typography variant="title">
              {a.firstname} {a.lastname}
            </Typography>
            <Typography variant="subtitle2">Applied: {a.date}</Typography>
              <Typography variant="subtitle2">Applied: {a.email}</Typography>
          </div>
          <div className="rightCardApplicant" onClick={this.goToJob(a.idJob)}>
            <Typography variant="title">{a.jobTitle}</Typography>
            <Typography variant="subtitle2">{a.jobDescription}</Typography>
          </div>
        </Card>
      </div>
    ));
  }
}
