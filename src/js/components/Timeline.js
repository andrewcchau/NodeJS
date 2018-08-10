import React from 'react';
import _ from 'lodash';
import {Header, Mismatch, Pending, Error, Button, TextBox} from './GeneralComponents';
import Tweets from './Tweets';
import TimelineUI from './TimelineUI';

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
        if(this.props.requestFunc){
            this.props.requestFunc(this.update);
        }
    }

    pending() {
        this.setState({
            status: statusEnum.PENDING
        });
    }

    update(jsonList, filtering) {
        if(jsonList) {
            if(filtering && _.isEmpty(jsonList)) {
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
                e(TimelineUI, { className: this.props.TLUIContainerClass,
                                displayUserTimeline: this.props.displayUserTimeline,
                                pendingFunc: Pending,
                                requestFunc: this.props.requestFunc,
                                filterFunc: this.props.filterFunc,
                                buttonClass: this.props.buttonClass,
                                buttonMessage: this.props.buttonMessage,
                                filterButtonClass: this.props.filterButtonClass,
                                filterButtonMessage: this.props.filterButtonMessage,
                                updateCallback: this.update,
                                textBoxClass: this.props.textBoxClass,
                                buttonDisabled: (this.props.displayUserTimeline ? false : true)
                            }),
                e('div', { className: this.props.dataClass }, component));
    }
}

export default Timeline;