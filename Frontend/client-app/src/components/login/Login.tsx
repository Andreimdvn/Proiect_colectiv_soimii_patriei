import * as React from "react";
import "./login.css";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import { withCookies, Cookies } from 'react-cookie';
import { stringify } from "querystring";

interface Props {
    cookies: Cookies
}

export class Login extends React.Component<any> {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        this.loginUser(data);
    }

    handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    async loginUser(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('http://localhost:16000/api/login',options);

        const response = await fetch(request).then(res => {
            res.json().then(r => {
                console.log(r);
                if (r.status === 0) {
                    alert(r.response);
                    this.props.cookies.set("token", r.response.token);
                    this.props.cookies.set("userType", r.response.type);
                } else if (r.status === -1) {
                    alert(r.response)
                }
            });
        });
    }

    constructor(props : any) {
        super(props);
    }
    render() : React.ReactNode {
        return (
            <div className="mainScreenLogin">
                <Paper className="paper">
                    <Typography style={{height: 20}} component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <br/>
                    <form className = "form" onSubmit={this.handleSubmit}>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="username">Username or email</InputLabel>
                            <Input id="username" name="username" autoFocus={true} onChange={this.handleChange}/>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" name="password" onChange={this.handleChange}/>
                        </FormControl>
                        <br/>
                        <br/>
                        <br/>
                        <div className="labelButton">                        
                            <label className="passwordLabel">Don't have an accout?</label>
                            <label onClick={this.props.switchScreen}>Register here</label>
                        </div>
                        <Button className="button" type="submit"
                            variant="contained"
                            color="secondary"> Login</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}
export default withCookies(Login); // withCookies adds this.props.cookies