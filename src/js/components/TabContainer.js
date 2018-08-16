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
            currentTab: "Home Timeline"
        };
    }

    /* Display content of tab */
    displayContent(tabName) {
        switch(tabName) {
            case "Home Timeline":
                return e(HomeTimeline);
                break;

            case "User Timeline":
                return e(UserTimeline);
                break;

            case "Post Tweet":
                return e(PostTweetUI);
                break;

            default: return null;
        }
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
                        onClick: () => {
                            this.setState({
                                currentTab: tabName
                            });
                        },
                        key: tabName + " Tab",
                        tabName: tabName
                    }

                    return Tab(tabProp);
                }),
                this.displayContent(this.state.currentTab));

    }
}

export default TabContainer;