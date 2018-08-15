import React from 'react';
import _ from 'lodash';

const e = React.createElement;

const Tab = (properties) => {
    return e('button', {className: properties.className, onClick: properties.onClick, key: properties.key}, properties.tabName);
}

let tab;

class TabContainer extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.children) {
            this.state = {
                content: this.props.children[0],
                currentTab: this.props.children[0].key
            };
        } else {
            this.state = {
                content: null
            }
        }
    }

    componentDidMount() {
        if(this.props.children) {
            tab = document.getElementsByClassName("tab");
            if(tab && tab[0]) {
                tab[0].className += " active";
            }
        }
    }

    openTab(event, tabName) {
        /* Change the content to be displayed */
        if(this.props.children) {
            let tabContent = this.props.children.filter((i) => _.isEqual(i.key, tabName));
            this.setState({
                content: tabContent,
                currentTab: tabName
            });
        }
    }

    render() {
        if(this.props.children) {
            return e('div', {className: "tabContainer"},
                    _.map(this.props.children, (content) => {
                        let append = "";
                        if(_.isEqual(this.state.currentTab, content.key)) {
                            append = " active";
                        }

                        let tabProp = {
                            className: "tab" + append,
                            onClick: (event) => this.openTab(event, content.key),
                            key: content.key + " Tab",
                            tabName: content.key
                        }

                        return Tab(tabProp);
                    }),
                    this.state.content);
        } else {
            return e('div', {className: "tabContainer"});
        }
    }
}

export default TabContainer;