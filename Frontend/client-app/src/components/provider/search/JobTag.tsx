import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/core';
import {jobPageStyle} from "../recommended-jobs/job-page-style";
import {Job} from "../../../view-models/Job";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import {jobFilterStyle} from "./JobFilterStyle";
import Input from "@material-ui/core/es/Input/Input";
import Button from "@material-ui/core/es/Button/Button";
import Card from "@material-ui/core/es/Card/Card";
import {jobTagStyle} from "./JobTagStyle";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Chip from "@material-ui/core/es/Chip/Chip";

interface Props extends StyledComponentProps{
  tag: string;
  callback: any;
}

export const JobTag = withStyles(jobTagStyle)(
  class JobTagBase extends React.Component<Props> {
    constructor(props) {
      super(props);
    }

    render() {
      const {classes} = this.props;
      return (
        <React.Fragment>
          <Chip color="primary" label={this.props.tag} onDelete={this.props.callback} avatar={<Avatar>{this.props.tag.slice(0,2).toUpperCase()}</Avatar>} />
        </React.Fragment>
      );
    }
  }
);



