import ViewStoreIntance, { ViewStore } from "./view-store";

export class RootStore {
  viewStore: ViewStore;

  constructor() {
    this.viewStore = ViewStoreIntance;
  }
}

export default new RootStore();
