import {HeaderTabs} from "../../view-models/header-tabs";

export class TabMenuProps {
    constructor(headerTab: HeaderTabs, link: string, text: string) {
        this.headerTab = headerTab;
        this.link = link;
        this.text = text;
    }

    headerTab: HeaderTabs;
    link: string;
    text: string;
}
