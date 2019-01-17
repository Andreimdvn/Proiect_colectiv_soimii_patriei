import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {Redirect} from "react-router";
import "./validation.css";

export class MailValidation extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        redirect : false
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    };

    render(): React.ReactNode {
        return (
            <div className="validation-container">
                <Typography component="h1" variant="display2">
                Please verify your email address.
                </Typography>
                <br/>
                {this.renderRedirect()}
                <Button
                    className="continueBtn"
                    fullWidth={false}
                    variant="contained"
                    color="primary"
                    onClick = {this.setRedirect}
                >
                    Continue
                </Button>
            </div>
        );
    }
}