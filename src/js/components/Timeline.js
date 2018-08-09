import React from 'react';
import _ from 'lodash';
import {Header, Mismatch, Pending, Error, Button, TextBox, ButtonEnable} from './GeneralComponents';
import Tweets from './Tweets';

const e = React.createElement;
const statusEnum = {
    PENDING: "Pending",
    ERROR: "Error",
    NO_MATCH: "No Match"
}

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: statusEnum.PENDING
        }
        this.update = this.update.bind(this);
        this.pending = this.pending.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        if(this.props.requestFunc){
            this.props.requestFunc(this.update);
        }
    }

    pending() {
        this.setState({
            status: statusEnum.PENDING
        });
    }

    update(jsonList) {
        if(jsonList) {
            this.setState({
                tweets: jsonList,
                status: statusEnum.PENDING
            });
        } else {
            this.setState({
                tweets: null,
                status: statusEnum.ERROR
            });
        }
    }

    updateFilter(jsonList) {
        if(jsonList) {
            if(_.isEmpty(jsonList)) {
                this.setState({
                    tweets: null,
                    status: statusEnum.NO_MATCH
                });
            } else {
                this.setState({
                    tweets: jsonList,
                    status: statusEnum.PENDING
                });
            }
        } else {
            this.setState({
                tweets: null,
                status: statusEnum.ERROR
            });
        }
    }

    render() {
        let component;

        /* Set Component to Append */
        if(this.state.tweets && !_.isEmpty(this.state.tweets)) {
            if(this.props.displayUserTimeline) {
                component = e(Tweets, { tweets: this.state.tweets, excludeHandle: true });
            } else {
                component = e(Tweets, { tweets: this.state.tweets });
            }
        } else if(_.isEqual(this.state.status, statusEnum.NO_MATCH)) {
            component = Mismatch("No tweets match your search query.");
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else if(this.props.displayUserTimeline && this.state.tweets && _.isEmpty(this.state.tweets)) {
            component = Error('No tweets are available, post a tweet!');
        } else {
            component = Error('Something went wrong. Please come back later!');
        }

        return e('div', {},
                e('header', {}, Header(this.props.header)),
                e('div', { className: this.props.TLUIContainerClass },
                    Button(this.props.buttonClass, () => {
                        this.pending();
                        this.props.requestFunc(this.update);
                    }, this.props.buttonMessage),
                    (this.props.displayUserTimeline ? null : Button(this.props.filterButtonClass, () => {
                        this.pending();
                        this.props.filterFunc(this.updateFilter);
                    }, this.props.filterButtonMessage)),
                    (this.props.displayUserTimeline ? null : TextBox("textInput", 30, "Enter Keyword", (event) => {
                        ButtonEnable("textInput", this.props.filterButtonClass);
                        if(event.keyCode == 13) {
                            this.pending();
                            this.props.filterFunc(this.updateFilter);
                        }
                    }))
                    ),
                e('div', { className: this.props.dataClass }, component));
    }
}

export default Timeline;