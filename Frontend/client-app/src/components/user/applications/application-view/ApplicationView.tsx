import * as React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Avatar from "@material-ui/core/Avatar/Avatar";
import WorkIcon from "@material-ui/icons/Work";

interface Props {
    title: string,
    email: string,
    date: string
}

export class ApplicationView extends React.Component<Props> {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={'root'}>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={2}>
                            <Avatar style={{marginTop: 5, marginLeft: 5}}>
                                <WorkIcon />
                            </Avatar>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <Typography component="h2" variant="headline" gutterBottom={true}>
                                Job title
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={2}>
                            <Typography variant="caption" gutterBottom={true} align="center">
                                date
                            </Typography>
                        </Grid>
                    </Grid>
                <Divider/>
            </div>
        )
    }
}