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

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export class ApplicantList extends React.Component<Props> {
  private applicants = [
    new Application(
      "Applicant1",
      "Applicant1",
      "18-01-2019",
      "JobTitle",
      "Lorem ipsum dolor sit amet, l semper nisl luctus. Mauris ut tellus luctus, vulputate nunc sed, suscipit odio. Ut congue ultrices porttitor. Sed nec turpis risus. "
    ),
    new Application(
      "Applicant1",
      "Applicant1",
      "18-01-2019",
      "JobTitle",
      "Lorem ipsum dolor sit amet, l semper nisl luctus. Mauris ut tellus luctus, vulputate nunc sed, suscipit odio. Ut congue ultrices porttitor. Sed nec turpis risus. "
    ),
    new Application(
      "Applicant1",
      "Applicant1",
      "18-01-2019",
      "JobTitle",
      "Lorem ipsum dolor sit amet, l semper nisl luctus. Mauris ut tellus luctus, vulputate nunc sed, suscipit odio. Ut congue ultrices porttitor. Sed nec turpis risus. "
    )
  ];

  constructor(props: Props) {
    super(props);
    this.state = { applicantsList: [] };
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
          console.log("succes");
        } else if (r.status === -1) {
          console.log("fail");
        }
      });
    });
  };

  render() {
    return this.applicants.map((a, index) => (
      <div key={index} className="applicantCard">
        <Card>
          <CardContent>
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
            </div>
            <div className="rightCardApplicant">
              <Typography variant="title">{a.jobTitle}</Typography>
              <Typography variant="subtitle2">{a.jobDescription}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    ));
  }
}
