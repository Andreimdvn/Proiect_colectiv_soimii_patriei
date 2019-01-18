import ViewStoreIntance, { ViewStore } from "./view-store";
import JobStoreInstance, {JobStore} from "./job-store";
import ApplicationInstance, {ApplicationStore} from "./application-store";

export class RootStore {
  viewStore: ViewStore;
  jobStore: JobStore;
  applicationStore: ApplicationStore;

  constructor() {
    this.viewStore = ViewStoreIntance;
    this.jobStore = JobStoreInstance;
    this.applicationStore = ApplicationInstance;
  }
}

export default new RootStore();
