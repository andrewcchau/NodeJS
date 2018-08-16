import React from 'react';
import _ from 'lodash';
import HomeTimeline from './HomeTimeline';
import UserTimeline from './UserTimeline';
import PostTweetUI from './PostTweetUI';

const e = React.createElement;

const Tab = (properties) => {
    return e('button', {className: properties.className,
                        onClick: properties.onClick,
                        key: properties.key},
                properties.tabName);
}

let tab;

class TabContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: ["Home Timeline", "User Timeline", "Post Tweet"],
            content: e(HomeTimeline),
            currentTab: "Home Timeline"
        };
    }

    /* Change the content to be displayed */
    openTab(event, tabName) {
        let content;
        switch(tabName) {
            case "Home Timeline":
                content = e(HomeTimeline);
                break;

            case "User Timeline":
                content = e(UserTimeline);
                break;

            case "Post Tweet":
                content = e(PostTweetUI);
                break;

            default: content = null;
        }

        this.setState({
            content: content,
            currentTab: tabName
        });
    }

    render() {
        return e('div', {className: "tabContainer"},
                _.map(this.state.tabs, (tabName) => {
                    let append = "";
                    if(_.isEqual(this.state.currentTab, tabName)) {
                        append = " active";
                    }

                    let tabProp = {
                        className: "tab" + append,
                        onClick: (event) => this.openTab(event, tabName),
                        key: tabName + " Tab",
                        tabName: tabName
                    }

                    return Tab(tabProp);
                }),
                this.state.content);

    }
}

export default TabContainer;