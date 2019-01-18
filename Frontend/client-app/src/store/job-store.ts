import { observable, action, computed } from "mobx";


export class JobStore {
    @observable status = -1;
    @observable message = "";
    @observable jobs = [];

    @computed get allJobs(){
        return this.jobs;
    }


    @action
    async addJobOffer(job,token){
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        const data = {
            token: {},
            job: {}
        };
        data.job = job;
        data.token = token;

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('http://localhost:16000/api/add',options);

        const response = await fetch(request).then(res => {
            res.json().then(r => {
                console.log(r);
                this.status = r.status;
                this.message = r.response;
            });
        })
    }
}

export default new JobStore(); // withCookies adds this.props.cookies
