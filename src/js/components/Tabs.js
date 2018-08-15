import React from 'react';
import _ from 'lodash';
import HomeTimeline from './HomeTimeline';
import UserTimeline from './UserTimeline';
import PostTweetUI from './PostTweetUI';

const e = React.createElement;

const Tab = (properties) => {
    return e('button', {className: properties.className, onClick: properties.onClick, key: properties.key}, properties.tabName);
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
//        if(this.props.children) {
//            let tabContent = this.props.children.filter((i) => _.isEqual(i.key, tabName));
//            this.setState({
//                content: tabContent,
//                currentTab: tabName
//            });
//        }
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
        /* TODO: TEST THIS THOROUGHLY!! */
        return e('div', {className: "tabContainer"},
//                    _.map(this.props.children, (content) => {
//                        let append = "";
//                        if(_.isEqual(this.state.currentTab, content.key)) {
//                            append = " active";
//                        }
//
//                        let tabProp = {
//                            className: "tab" + append,
//                            onClick: (event) => this.openTab(event, content.key),
//                            key: content.key + " Tab",
//                            tabName: content.key
//                        }
//
//                        return Tab(tabProp);
//                    }),
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