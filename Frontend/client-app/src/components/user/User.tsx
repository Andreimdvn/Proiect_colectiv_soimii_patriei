import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBox from "@material-ui/icons/AccountBox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router";
import { ReactNode } from "react";

import "./user.css";

interface State {
  open: boolean;
  redirect: ReactNode;
}

const initialState: State = {
  open: false,
  redirect: undefined
};

class User extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = event => {
    if (event.target.value) {
      const destinationURL = "/user/" + event.target.value;
      this.setState({ redirect: <Redirect to={destinationURL} /> }, () => {
        this.setState({ redirect: undefined });
      });
    }
  };

  render() {
    return this.state.redirect ? (
      this.state.redirect
    ) : (
      <div className="account-box">
        <IconButton className="account-box-button" onClick={this.handleOpen}>
          <AccountBox className="account-box-icon" fontSize="large" />
        </IconButton>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onChange={this.handleChange}
          className="account-box-select"
        >
          <MenuItem value="offers">My job offers</MenuItem>
          <MenuItem value="edit">Edit profile</MenuItem>
          <MenuItem>Log out</MenuItem>
        </Select>
      </div>
    );
  }
}

export default User;
