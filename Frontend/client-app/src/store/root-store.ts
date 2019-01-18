import ViewStoreIntance, { ViewStore } from "./view-store";
import JobStoreInstance, {JobStore} from "./job-store";

export class RootStore {
  viewStore: ViewStore;
  jobStore: JobStore;

  constructor() {
    this.viewStore = ViewStoreIntance;
    this.jobStore = JobStoreInstance;
  }
}

export default new RootStore();
