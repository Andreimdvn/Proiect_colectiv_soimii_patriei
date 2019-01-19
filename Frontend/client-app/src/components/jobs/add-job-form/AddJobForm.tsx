import * as React from "react";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from "@material-ui/core/es/Typography";
import InputAdornment from "@material-ui/core/es/InputAdornment";
import FormLabel from "@material-ui/core/es/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Button from "@material-ui/core/Button/Button";
import {JobStore} from "../../../store/job-store";
import {Cookies, withCookies} from "react-cookie";
import "./addJobForm.css";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import Radio from "@material-ui/core/es/Radio/Radio";

interface Props {
    jobStore: JobStore,
    cookies: Cookies,
}

@inject("jobStore")
@observer
export class AddJobForm extends React.Component<any> {
    state={
        title: "",
        jobDesc: "",
        candiDesc: "",
        emplDesc: "",
        payment: "",
        street: "",
        city: "",
        county: "",
        jobType: "",
        tags: []
    };

    initialState={
    title: "",
    jobDesc: "",
    candiDesc: "",
    emplDesc: "",
    payment: "",
    street: "",
    city: "",
    county: "",
    jobType: "",
    tags: []
};

    constructor(props: any) {
        super(props);
        this.state = this.initialState;
    }

    handleChange = event =>{
        event.preventDefault();
        console.log(event.target.value);
        if(event.target.name === "tags"){
            const tagss = event.target.value.split("#");
            tagss.splice(0,1);
            tagss.map((tag) => tag.trim());
            this.setState({tags: tagss} );
        }else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const job = {
            title: this.state.title,
            jobDesc: this.state.jobDesc,
            candidateDesc: this.state.candiDesc,
            employerDesc: this.state.emplDesc,
            payment: this.state.payment,
            street: this.state.street,
            city: this.state.city,
            county: this.state.county,
            jobType: this.state.jobType,
            tags: this.state.tags
        };
        const cookie = new Cookies();
        const token = cookie.get("token");
        this.props.jobStore.addJobOffer(job,token);

        console.log(this.props.jobStore.message);
        console.log(this.props.jobStore.status);
        this.setState(this.initialState);
    };

  render() {
    return <div className={"root"}>
        <Grid container={true} spacing={8}>
            <Grid item={true} xs={12} sm={2} style={{marginTop: 20}}>
                <Typography variant="h5">
                    General
                </Typography>
            </Grid>
            <Grid item={true} xs={12} sm={10}>
                <form className="jobForm">
                    <FormControl required={true} fullWidth={true}>
                        <TextField
                            id="outlined-uncontrolled"
                            name="title"
                            label="Title"
                            className={"textField"}
                            onChange={this.handleChange}
                            value={this.state.title}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            name="jobDesc"
                            label="Job description"
                            value={this.state.jobDesc}
                            multiline={true}
                            rows="4"
                            fullWidth={true}
                            onChange={this.handleChange}
                            className={"textField"}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Candidate description"
                        name="candiDesc"
                        value={this.state.candiDesc}
                        placeholder={"How does the ideal candidate look like? This field is not required."}
                        multiline={true}
                        rows="3"
                        fullWidth={true}
                        onChange={this.handleChange}
                        className={"textField"}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Employer description"
                        name="emplDesc"
                        value={this.state.emplDesc}
                        placeholder={"Write a bit about yourself. This field is not required."}
                        multiline={true}
                        rows="3"
                        fullWidth={true}
                        onChange={this.handleChange}
                        className={"textField"}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth={true}
                        label="Payment"
                        className={"textField"}
                        placeholder={"eg. 200 , 1000-1500 etc."}
                        name="payment"
                        value={this.state.payment}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">RON</InputAdornment>
                        }}
                        variant="outlined"
                        margin="normal"
                    />
                </form>
            </Grid>
            <Grid item={true} xs={12} sm={2} style={{marginTop: 20}}>
                <Typography variant="h5">
                    Address
                </Typography>
            </Grid>
            <Grid item={true} xs={12} sm={10}>
                <form className={"jobForm"}>
                    <FormControl required={true} fullWidth={true}>
                        <TextField
                            id="outlined-uncontrolled"
                            name="street"
                            label="Street"
                            value={this.state.street}
                            placeholder="Street and number"
                            className={"textField"}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            name="city"
                            value={this.state.city}
                            label="City"
                            onChange={this.handleChange}
                            className={"textField"}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            name="county"
                            value={this.state.county}
                            label="County"
                            className={"textField"}
                            margin="normal"
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth={true}
                        />
                    </FormControl>
                </form>
            </Grid>
            <Grid item={true} xs={12} sm={2} style={{marginTop: 20}}>
                <Typography variant="h5">
                    Details
                </Typography>
            </Grid>
            <Grid item={true} xs={12} sm={10}>
                <Grid container={true} spacing={8}>
                    <Grid item={true} xs={12} sm={2}>
                        <FormControl component={"fieldset" as "div"}>
                            <FormLabel>Job type</FormLabel>
                            <RadioGroup
                                aria-label="Job type"
                                name="jobType"
                                className={"group"}
                                value={this.state.jobType}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="Full-time" control={<Radio />} label="Full-time" />
                                <FormControlLabel value="Part-time" control={<Radio />} label="Part-time" />
                                <FormControlLabel value="Internship" control={<Radio />} label="Internship" />
                                <FormControlLabel value="Temporary" control={<Radio  />} label="Temporary" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={12} sm={10}>
                        <FormControl component={"fieldset" as "div"} fullWidth={true}>
                            <FormLabel>Tags</FormLabel>
                            {this.state.tags.length === 0 ? <TextField
                                id="outlined-uncontrolled"
                                name="tags"
                                value=""
                                label="Tags"
                                placeholder="eg. #dogs #weekends etc."
                                className={"textField"}
                                margin="normal"
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth={true}
                            /> : <TextField
                                id="outlined-uncontrolled"
                                name="tags"
                                label="Tags"
                                placeholder="eg. #dogs #weekends etc."
                                className={"textField"}
                                margin="normal"
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth={true}
                            />}

                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={12}>
                <Button
                    className="submitBtn"
                    type="submit"
                    fullWidth={false}
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Add job offer
                </Button>
            </Grid>
        </Grid>
       </div>;
  }
}

export default withCookies(AddJobForm);