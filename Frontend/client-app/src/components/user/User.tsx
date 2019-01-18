import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBox from "@material-ui/icons/AccountBox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router";
import { ReactNode } from "react";

import "./user.css";
import { Cookies } from "react-cookie";

interface State {
  open: boolean;
  redirect: ReactNode;
}

interface Props {
  cookies: Cookies;
}

const initialState: State = {
  open: false,
  redirect: undefined
};

class User extends React.Component<any, State> {
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
      if (event.target.value === "logout") {
        this.handleLogout();
      } else {
        const destinationURL = "/user/" + event.target.value;
        this.setState({ redirect: <Redirect to={destinationURL} /> }, () => {
          this.setState({ redirect: undefined });
        });
      }
    }
  };

  handleLogout = async () => {
    const cookies = new Cookies();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ token: cookies.get("token") })
    };

    const request = new Request("http://localhost:16000/api/logout", options);

    const response = await fetch(request).then(res => {
      res.json().then(r => {
        if (r.status === 0) {
          cookies.set("token", "");
          cookies.set("userType", "");
          this.props.cookies.set("token", "");
          this.props.cookies.set("userType", "");
          this.setState({ redirect: <Redirect to={""} /> }, () => {
            this.setState({ redirect: undefined });
          });
        } else if (r.status === -1) {
          alert(r.response);
        }
      });
    });
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
          {this.props.cookies.get("userType") === "client" ? (
            <MenuItem value="applicants">View applicants</MenuItem>
          ) : (
            <MenuItem value="offers">My job offers</MenuItem>
          )}

          <MenuItem value="edit">Edit profile</MenuItem>
          <MenuItem value="logout">Log out</MenuItem>
        </Select>
      </div>
    );
  }
}

export default User;
