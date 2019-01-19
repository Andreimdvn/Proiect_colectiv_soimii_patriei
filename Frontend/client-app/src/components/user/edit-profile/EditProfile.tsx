import * as React from "react";
import {inject, observer} from "mobx-react";
import {Button, Card, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/es/Grid";
import './EditProfile.css';
import {Cookies} from "react-cookie";

interface State {
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  avatar: string,
  file: string,
  phone: string,
  company: string
}
const cookie = new Cookies();
let imageUrl;

@observer
export class EditProfile extends React.Component<any,State> {
  constructor(props : any) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      avatar: "",
      file: "",
      phone: "",
      company: ""
    };


    this.handleChange = this.handleChange.bind(this);
    this.getInfo();

    this.onDrop = this.onDrop.bind(this);
  }

  async getInfo() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const tokenProvider = cookie.get('token');

    const data = {
      token: tokenProvider,
    };

    console.log(tokenProvider);

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    };

    const request = new Request('http://localhost:16000/profile', options);

    const response = await fetch(request).then(res => {
      res.json().then(r => {
        console.log(r);
        if (r.status === 0) {
          alert("You received your information!");
          const fields = r.response;
          this.setState({
            firstname: fields.name.split(' ')[0],
            lastname: fields.name.split(' ')[1],
            email: fields.email,
            avatar: fields.avatar,
            phone:fields.phone,
            company:fields.company
          });
        } else if (r.status === -1) {
          alert(r.response)
        }
      });
    });

  }

  handleChange(selectorFiles: FileList
  ) {
    console.log(selectorFiles);
  }

  handleUpdate= async ()=> {
    const imgFile = this.state.file;
    const token = cookie.get("token");
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      site_link: '',
      company: '',
      avatar: imgFile,
      phone: '',
      token: ''
    };
    data.token=token;

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    };
    console.log("Get job " +options);

    const request = new Request('http://localhost:16000/api/edit_profile' ,options);

    const response = await fetch(request).then(res => {
      res.json().then(r => {
        console.log(r);
        if (r.status === 0) {
          console.log("Success");
          this.setState({
            // site_link: data.site_link,
            company: data.company,
            avatar: data.avatar,
            phone: data.phone
          });
        } else if (r.status === -1) {
          alert(r.response)
        }
      });
    });

  }

  onDrop = (picture) => {
    imageUrl = picture.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(imageUrl);
    reader.onloadend = () => {
      this.setState({
        avatar: URL.createObjectURL(imageUrl),
        file: reader.result.slice(reader.result.indexOf(',') + 1)
      });
    };
  };

  render() {
    return (
        <Grid>
          <br/>
          <Grid container={true} spacing={16} direction={"row"}>
            <Grid item={true} xs={12}>
              <Card className={'cardd'}>
                <Typography style={{height: 20}} component="h1" variant="h3">
                  User profile
                </Typography>
              </Card>
            </Grid>
            <Grid item={true} xs={2}>
              <Card>
                <br/>
                <Typography style={{height: 20}} component="h1" variant="h5">
                  Your data
                </Typography>
                <ul className="ul">
                  <li className="li">
                    Username:

                    {this.state.username}

                  </li>
                  <br/>
                  <li>
                    First Name:{this.state.firstname}
                  </li>
                  <br/>
                  <li>
                    Last Name:{this.state.lastname}
                  </li>
                  <br/>
                  <li>
                    Email:{this.state.email}
                  </li>
                  <br/>
                  <li>
                    Phone:{this.state.phone}
                  </li>
                  <br/>
                  <li>
                    Company:{this.state.company}
                  </li>
                  <br/>
                </ul>

              </Card>
            </Grid>
            <Grid item={true} xs={2}>
              <Card className={'cardd'}>
                <img src={this.state.avatar} className={'imageP'}/>
                <input type="file" onChange={this.onDrop}/>
              </Card>
            </Grid>
            <Grid item={true} xs={8}>
              <Card className={'cardd'}>
                See your doc

              </Card>
            </Grid>
            <Grid item={true} xs={4}>

              <Card className={'cardd'}>
                <input type="file" onChange={(e) => this.handleChange(e.target.files)}/>
              </Card>
            </Grid>

            <Grid item={true} xs={4}>

              <Card className={'cardd'}>
                <button onClick={this.handleUpdate}>
                  Add </button>
              </Card>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}
