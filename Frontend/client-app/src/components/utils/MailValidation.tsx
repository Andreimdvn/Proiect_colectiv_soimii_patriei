import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";

export class MailValidation extends React.Component{
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return (<main>
            <div className="container">
                <Typography component="h1" variant="h3">
                Please verify your email address.
            </Typography>
                <Button
                    className="continueBtn"
                    fullWidth={false}
                    variant="contained"
                    color="primary"
                >
                    Continue
                </Button>
            </div>
            </main>
        );
    }
}