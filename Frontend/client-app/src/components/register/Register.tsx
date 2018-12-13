import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import "./register.css"
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

export class Register extends React.Component<any> {
    state ={
        username: '',
        password: '',
        email:'',
        firstName: '',
        lastName: '',
        birth: '',
        phone: '',
        type: 'client',
        termsAccepted : false,
    };
    constructor(props) {
        super(props);
    }

    handleTerms = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: !this.state.termsAccepted
        });
        console.log(this.state.termsAccepted);
    };

    handleSubmit = (event)=>{
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            date_of_birth: this.state.birth,
            phone: this.state.phone,
            account_type: this.state.type
        };
        this.addUser(data);
    };

    handleInputChange = (event)=>{
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    };

     async addUser(data) {
        const headers = new Headers();
        headers.append('Content-Type','application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('http://localhost:16000/api/register',options);

        const response = await fetch(request).then(res => {
            res.json().then(r => {
                console.log(r);
                if (r.status === 0) {
                    alert(r.response)
                    this.props.switchScreen();
                } else if (r.status === -1) {
                    alert(r.response)
                }
            });
        })
    };

    render(): React.ReactNode {
        return (
            <div className="mainScreenRegister">
                <Paper className="paper">
                    <Typography component="h1" variant="h5">
                        Register form
                    </Typography>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="firstName">First name</InputLabel>
                            <Input id="firstName" name="firstName" autoFocus={true} onChange={this.handleInputChange}/>
                        </FormControl>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="lastName">Last name</InputLabel>
                            <Input id="lastName" name="lastName"  onChange={this.handleInputChange}/>
                        </FormControl>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input type="email" id="email" name="email" onChange={this.handleInputChange}/>
                        </FormControl>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="phone">Phone number</InputLabel>
                            <Input id="phone" name="phone" onChange={this.handleInputChange}/>
                        </FormControl>
                        <FormControl required={true} fullWidth={true}>
                            <TextField
                                label="Birthday"
                                type="date"
                                id="birth"
                                name="birth"
                                onChange={this.handleInputChange}
                                InputLabelProps={{
                                shrink: true,
                            }}/>
                        </FormControl>

                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" onChange={this.handleInputChange}/>
                        </FormControl>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input type="password" id="password" name="password" onChange={this.handleInputChange}/>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="account-type">Type</InputLabel>
                            <Select
                                value="client"
                                onChange={this.handleInputChange}
                                inputProps={{
                                    name: 'type',
                                    id: 'account-type',
                                }}
                            >
                                <MenuItem value="client">Client</MenuItem>
                                <MenuItem value="provider">Provider</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                        control={<Checkbox
                                    value="termsAccepted"
                                    name="termsAccepted"
                                    onClick={this.handleTerms}
                                    checked={this.state.termsAccepted}
                                />}
                        label="I agree with the Terms and Conditions"
                        />
                        <br/>
                        <div>
                        <label className="passwordLabel">You already have an account?</label>
                        <label onClick={this.props.switchScreen}> Click here to login!</label>
                        </div>
                    <Button
                        className="submitBtn"
                        type="submit"
                        fullWidth={false}
                        variant="contained"
                        color="primary"
                        disabled={!this.state.termsAccepted}
                    >
                        Register
                    </Button>
                </form>
        </Paper>
        </div>
        );
    }
}
