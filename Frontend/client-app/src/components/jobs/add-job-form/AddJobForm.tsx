import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "src/store/view-store";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Button from "@material-ui/core/es/Button/Button";

interface Props {
    viewStore: ViewStore;
}

@inject("viewStore")
@observer
export class AddJobForm extends React.Component<Props> {
    state = {
        type: '',
        description: '',
        reward: '',
    }

    constructor(props: Props) {
        super(props);
    }

    handleInputChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleAddJob = (event) => {
        event.preventDefault();
        const data = {
            type: this.state.type,
            description: this.state.description,
            reward: this.state.reward
        };
        this.addJob(data);
    };

    async addJob(data) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Access-Control-Allow-Origin','*');

      const options = {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
      };

      const request = new Request('http://localhost:16000/api/add_job', options);

      const response = await fetch(request).then( res => {
          res.json().then(responseJson => {
            console.log(responseJson);
            alert(responseJson.response);
          })
      })
    }

    render() {


        return (<main>
            <Paper className="paper">
                <Typography component="h1" variant="h5">
                    Add a job
                </Typography>
                <form className="addJobForm" onSubmit={this.handleAddJob}>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor="type"> Type </InputLabel>
                        <Select
                            value="type"
                            onChange={this.handleInputChange}
                            inputProps={{
                                name: "type",
                                id: "type"
                            }}
                        >
                            <MenuItem value="full">Full-time</MenuItem>
                            <MenuItem value="part">Part-time</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor="description"> Description </InputLabel>
                        <Input id="description" name="description" autoFocus={true} onChange={this.handleInputChange}/>
                    </FormControl>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor="reward"> Reward </InputLabel>
                        <Input id="reward" name="reward" autoFocus={true} onChange={this.handleInputChange}/>
                    </FormControl>
                  <Button
                    className="btnAddJob"
                    type="submit"
                    fullWidth={false}
                    variant="contained"
                    color="primary">
                      Add
                  </Button>
                </form>
            </Paper>
        </main>)
    }
}
