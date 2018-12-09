import * as React from "react";
import {Job} from "../../../view-models/Job";

interface Props {
  jobs:Job[]
}

export class RecommendedJobsTable extends React.Component<Props> {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <React.Fragment>
        <table>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Reward</th>
            <th>Publisher</th>
            <th>Date</th>
          </tr>

          {this.props.jobs.map(job =>{
            return (
              <tr key={job.id}>
                <td>{job.type}</td>
                <td>{job.descriptionPreview}</td>
                <td>{job.reward}</td>
                <td>{job.publisher}</td>
                <td>{job.date}</td>
              </tr>
            );
          })}

        </table>
      </React.Fragment>
    );
  }
}