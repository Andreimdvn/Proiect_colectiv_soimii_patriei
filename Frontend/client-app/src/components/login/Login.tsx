import * as React from "react";
import "./login.css";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

export class Login extends React.Component {
    handleSubmit() {
        const a = "ad";
        return a;
    }
    handleChange() {
        const a = "ad";
        return a;
    }
    constructor(props : any) {
        super(props);
    }
    render() : React.ReactNode {
        return (<main className="background">
                    <Paper className="paper">
                    <Typography style={{height: 20}} component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className = "form" onSubmit={this.handleSubmit}>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="name">Username or email</InputLabel>
                            <Input className = "input" id="name" name="name" autoFocus={true} onChange={this.handleChange}/>
                        </FormControl>
                        <FormControl required={true} fullWidth={true}>
                            <InputLabel htmlFor="name">Password</InputLabel>
                            <Input className = "input" id="password" name="password" autoFocus={true} onChange={this.handleChange}/>
                        </FormControl>
                        <div className="labelButton">                        
                            <label className="passwordLabel">Forgot your password?Click here</label>
                            <Button className="button" type="submit"
                            variant="contained"
                            color="secondary"> Login</Button>
                        </div>

                    </form>
                    </Paper>
              </main>
        );
    }
}