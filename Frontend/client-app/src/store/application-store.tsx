import {action, observable} from "mobx";

export class ApplicationStore {
    @observable applications = [];

    @action
    async getApplications(token){
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        const data = {
            token: {}
        };
        data.token = token;

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        const request = new Request('http://localhost:16000/api/jobs_for_provider',options);

        const response = await fetch(request).then(res => {
            res.json().then(r => {
                console.log(r);

            });
        })
    }
}