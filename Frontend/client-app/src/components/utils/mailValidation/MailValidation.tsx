import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import "./validation.css";
import { Login } from "../../login/Login";
import history from "../../../history";

interface Props {
  switchScreen: any;
}

export class MailValidation extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  state = {
    redirect: false
  };

  setRedirect = () => {
    if (this.state.redirect === false) {
      this.props.switchScreen();
      history.push("/login");
    }
    this.setState({
      redirect: true
    });
  };

  render(): React.ReactNode {
    return this.state.redirect ? (
      <Login switchScreen={this.props.switchScreen} cookies={undefined} />
    ) : (
      <div className="validation-container">
        <Typography component="h1" variant="display2">
          Please verify your email address.
        </Typography>
        <br />
        {/* {this.renderRedirect()} */}
        <Button
          className="continueBtn"
          fullWidth={false}
          variant="contained"
          color="primary"
          onClick={this.setRedirect}
        >
          Continue
        </Button>
      </div>
    );
  }
}
