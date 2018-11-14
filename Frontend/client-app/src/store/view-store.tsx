import { observable, action, computed } from "mobx";
import { HeaderTabs } from "../view-models/header-tabs";

export class ViewStore {
    @observable headerActivatedTab: HeaderTabs = HeaderTabs.home;

    @computed get activeHeaderTab() {
        return this.headerActivatedTab;
    }

    @action.bound
    changeActiveHeaderTab(tab: HeaderTabs) {
        this.headerActivatedTab = tab;
    }
}

export default new ViewStore();