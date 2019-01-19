import * as React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Avatar from "@material-ui/core/Avatar/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import {Redirect} from "react-router";

interface Props {
    title: string,
    date: string,
    id: number
}

export class ApplicationView extends React.Component<Props, any> {
    constructor(props){
        super(props);
        this.state = {redirect: undefined}
    }

    goToJob =(id) => (event) => {
        this.setState({redirect: <Redirect to={"/job/"+id}/>}, () => {
            this.setState({redirect: undefined})
        })
    }

    render(){
        return this.state.redirect ? this.state.redirect : (
            <div className={'root'} onClick={this.goToJob(this.props.id)}>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={2}>
                            <Avatar style={{marginTop: 1, marginLeft: 5}}>
                                <WorkIcon />
                            </Avatar>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <Typography component="h2" variant="headline" gutterBottom={true}>
                                {this.props.title}
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={2}>
                            <Typography variant="caption" gutterBottom={true} align="center">
                                {this.props.date}
                            </Typography>
                        </Grid>
                    </Grid>
                <Divider/>
            </div>
        )
    }
}