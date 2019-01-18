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
import {JobTag} from "./JobTag";

interface Props extends StyledComponentProps{
  onFilterCallback: any
}

interface State {
  type: string;
  tags: string[];
  currentTag: string;
  description: string;

}

export const JobFilter = withStyles(jobFilterStyle)(
  class RecommendedJobsTableBase extends React.Component<Props, State> {
    constructor(props) {
      super(props);

      this.state = {type: 'any', tags: [], currentTag: '', description: ''};
    }

    // doFilter(callback) {
    //   // todo get things from state params
    //   // todo also this should be in onSearch
    //
    //   const jobs = [
    //     new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
    //     new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
    //     new Job("3", "kid", "Lorem ipsum dolor sit amet, consectetur adipiscing el", "xfg45", "12", "30-09-2018"),
    //     new Job("4", "kid", "a vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id imperdiet ipsum tristique sit amet. Proin bibendum dui in ultricies euismod. Nunc ", "xfg45", "12", "30-09-2018"),
    //     new Job("5", "kid", "mentum aliquet purus", "xfg45", "12", "30-09-2018"),
    //     new Job("6", "kid", "am nunc. Ut viverra massa vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id impe", "xfg45", "12", "30-09-2018"),
    //     new Job("7", "kid", "", "xfg45", "12", "30-09-2018"),
    //   ];
    //
    // }

    onChangeType = event => {
      this.setState({ type: event.target.value });
    };
    onChangeTags = event => {
      this.setState({ currentTag: event.target.value });
    };
    onChangeDescription = event => {
      this.setState({ description: event.target.value });
    };
    onSearch = () => {
      const type = this.state.type;
      const tags = this.state.tags;
      const description = this.state.description;

      const jsonObj: {[k: string]: any} = {};
      if(type === 'any')
        jsonObj.type = "";
      // if(tags.length !== 0)
        jsonObj.tags = tags;
      // if(description !== '')
        jsonObj.description = description;

      console.log(jsonObj);

      // const jobs = [
      //   new Job("1", "cleaning", "clean my house", "bob321", "dinner", "20-09-2018"),
      //   new Job("2", "dog walk", "walk good boie", "angry_cat98", "5", "23-09-2018"),
      //   new Job("3", "kid", "Lorem ipsum dolor sit amet, consectetur adipiscing el", "xfg45", "12", "30-09-2018"),
      //   new Job("4", "kid", "a vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id imperdiet ipsum tristique sit amet. Proin bibendum dui in ultricies euismod. Nunc ", "xfg45", "12", "30-09-2018"),
      //   new Job("5", "kid", "mentum aliquet purus", "xfg45", "12", "30-09-2018"),
      //   new Job("6", "kid", "am nunc. Ut viverra massa vitae massa imperdiet pulvinar. Pellentesque commodo massa ipsum, id impe", "xfg45", "12", "30-09-2018"),
      //   new Job("7", "kid", "", "xfg45", "12", "30-09-2018"),
      // ];
      // this.props.onFilterCallback(jobs);

      const promisedResponse = fetch("http://localhost:16000/api/filter", { // fixme change link
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObj)
      });

      promisedResponse.then(response => response.json()).then(json =>{
        console.log(json);
        if(json.status === 0) {
          this.props.onFilterCallback(json.response);
        }
        else {
          console.log("ceva a crapat");
        }
      }).catch(error=> {
        console.log(error);
      });

    };

    checkForEnter = (event) => {
      if (event.key === 'Enter' && this.state.currentTag !== '') {
        this.state.tags.push(this.state.currentTag);
        this.setState({currentTag: ''});
      }
    };

    onPressX(index:number) {
      const pl = this.state.tags;
      pl.splice(index, 1);
      this.setState({tags: pl});
    }

    render() {
      const {classes} = this.props;

      return (
        <React.Fragment>
          <Grid container={true} className={classes.container}>
            <Grid item={true} xs={1}>
              <Typography className={classes.label}>Job type</Typography>

            </Grid>
            <Grid item={true} xs={1}>
              <Select
                value={this.state.type}
                onChange={this.onChangeType}
                inputProps={{
                  name: 'type',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={'any'}>Any</MenuItem>
                <MenuItem value={'partTime'}>Part time</MenuItem>
                <MenuItem value={'fullTime'}>Full time</MenuItem>
              </Select>
            </Grid>

            <Grid item={true} xs={2}>
              <Grid container={true}>
                {this.state.tags.map((tag, index) => {
                  return (
                    <Grid item={true} xs={6} key={index}>
                      <JobTag  tag={tag} callback={()=>{this.onPressX(index)}}/>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Grid item={true} xs={1}>


              <Input
                placeholder="Tags"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Description',
                }}
                onChange={this.onChangeTags}
                onKeyDown = {this.checkForEnter}
                value = {this.state.currentTag}
              />
            </Grid>

            <Grid item={true} xs={1}/>


            <Grid item={true} xs={3}>
              <Input
                placeholder="Description"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Description',
                }}
                onChange={this.onChangeDescription}
              />
            </Grid>

            <Grid item={true} xs={1}>
              <Button variant="contained" color="primary" className={classes.searchButton} onClick={this.onSearch}>
                Search
              </Button>
            </Grid>

            </Grid>


        </React.Fragment>
      );
    }
});


