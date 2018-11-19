import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountBox from "@material-ui/icons/AccountBox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./user.css";

interface State {
  open: boolean;
}

const initialState: State = {
  open: false
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

  render() {
    return (
      <div className="account-box">
        <IconButton className="account-box-button" onClick={this.handleOpen}>
          <AccountBox className="account-box-icon" fontSize="large" />
        </IconButton>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          //   onOpen={this.handleOpen}
          //   value={this.state.age}
          //   onChange={this.handleChange}
          className="accout-box-select"
        >
          <MenuItem value={10}>My job offers</MenuItem>
          <MenuItem value={20}>Edit profile</MenuItem>
          <MenuItem value={30}>Log out</MenuItem>
        </Select>
      </div>
    );
  }
}

export default User;
