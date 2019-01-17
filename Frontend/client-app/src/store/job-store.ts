import { observable, action, computed } from "mobx";

export class JobStore{
    @observable jobs = [];

    @computed get allJobs(){
        return this.jobs;
    }

    @action
    async addJobOffer(data){
        console.log("Add job from store : cool!");
    }
}

export default new JobStore();