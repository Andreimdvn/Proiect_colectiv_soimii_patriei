import * as React from "react";
import { inject, observer } from "mobx-react";
import { ViewStore } from "src/store/view-store";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from "@material-ui/core/es/Typography";
import InputAdornment from "@material-ui/core/es/InputAdornment";
import {FormControl} from "@material-ui/core";
import FormLabel from "@material-ui/core/es/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/es/Radio/Radio";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";

interface Props {
  viewStore: ViewStore;
}

@inject("viewStore")
@observer
export class AddJobForm extends React.Component<Props> {
    state={
        title: "",
        jobDesc: "",
        candiDesc: "",
        emplDesc: "",
        payment: 0,
    };

    constructor(props: Props) {
        super(props);
    }

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
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            name="jobDesc"
                            label="Job description"
                            multiline={true}
                            rows="4"
                            fullWidth={true}
                            className={"textField"}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Candidate description"
                        name="candiDesc"
                        placeholder={"How does the ideal candidate look like? This field is not required."}
                        multiline={true}
                        rows="3"
                        fullWidth={true}
                        className={"textField"}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Employer description"
                        name="emplDesc"
                        placeholder={"Write a bit about yourself. This field is not required."}
                        multiline={true}
                        rows="3"
                        fullWidth={true}
                        className={"textField"}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth={true}
                        label="Payment"
                        className={"textField"}
                        name="payment"
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
                    Details
                </Typography>
            </Grid>
            <Grid item={true} xs={12} sm={10}>
                <Grid container={true} spacing={8}>
                        <Grid item={true} xs={12} sm={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Experience</FormLabel>
                            <RadioGroup
                                aria-label="Experience"
                                name="experience"
                                className={"group"}
                            >
                                <FormControlLabel control={<Checkbox value="entry" />} label="Entry-Level (< 2 years)" />
                                <FormControlLabel control={<Checkbox value="mid"/>} label="Mid-Level (2-5 years)" />
                                <FormControlLabel control={<Checkbox value="senior"/>} label="Senior-Level (> 5 years)" />
                                <FormControlLabel control={<Checkbox value="none" />} label="Irrelevant" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item={true} xs={12} sm={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Job type</FormLabel>
                            <RadioGroup
                                aria-label="Job type"
                                name="jobType"
                                className={"group"}
                            >
                                <FormControlLabel control={<Checkbox value="full" />} label="Full-time" />
                                <FormControlLabel control={<Checkbox value="part"/>} label="Part-time" />
                                <FormControlLabel control={<Checkbox value="intern"/>} label="Internship" />
                                <FormControlLabel control={<Checkbox value="service" />} label="Services" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={12} sm={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Foreign Languages</FormLabel>
                            <RadioGroup
                                aria-label="Languages"
                                name="languages1"
                                className={"group"}
                            >
                                <FormControlLabel control={<Checkbox value="eng" />} label="English" />
                                <FormControlLabel control={<Checkbox value="fr"/>} label="French" />
                                <FormControlLabel control={<Checkbox value="ger"/>} label="German" />
                                <FormControlLabel control={<Checkbox value="ita" />} label="Italian" />
                                <FormControlLabel control={<Checkbox value="other" />} label="Others" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
       </div>;
  }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});
