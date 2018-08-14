import React from 'react';
import _ from 'lodash';

const e = React.createElement;

const Tab = (callback, tabName) => {
    return e('button', {className: "tab", onClick: callback, key: tabName + " Tab"}, tabName);
}


class TabContainer extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.children) {
            this.state = {
                content: this.props.children[0]
            };
        } else {
            this.state = {
                content: null
            }
        }
    }

    openTab(event, tabName) {
        let i, tab;

        /* Change tab appearance */
        tab = document.getElementsByClassName("tab");
        for(i = 0; i < tab.length; i++) {
            tab[i].className = tab[i].className.replace(" active", "");
        }
        event.currentTarget.className += " active";

        /* Change the content to be displayed */
        if(this.props.children) {
            let tabContent = this.props.children.filter((i) => _.isEqual(i.key, tabName));
            this.setState({
                content: tabContent
            });
        }
    }

    render() {
        return e('div', {className: "tabContainer"},
                _.map(this.props.children, (content) =>
                    Tab((event) => this.openTab(event, content.key), content.key)),
                this.state.content);
    }
}

export default TabContainer;