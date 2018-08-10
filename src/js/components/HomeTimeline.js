import React from 'react';
import _ from 'lodash';
import Tweets from './Tweets';
import TimelineUI from './TimelineUI';
import {Request, RequestFilterTimeline} from '../services/httpCall';
import {Header, Mismatch, Pending, Error, statusEnum} from './GeneralComponents';

const e = React.createElement;

class HomeTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: statusEnum.PENDING
        }
        this.update = this.update.bind(this);
        Request(this.update);
    }

    update(jsonList) {
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

        if(this.state.tweets && !_.isEmpty(this.state.tweets)) {
            component = e(Tweets, { tweets: this.state.tweets });
        } else if(_.isEqual(this.state.status, statusEnum.NO_MATCH)) {
            component = Mismatch("No tweets match your search query.");
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else {
            component = Error('Something went wrong. Please come back later!');
        }

        return e('div', {},
                e('header', {}, Header("Home Timeline")),
                e(TimelineUI, { className: 'homeTLUIContainer',
                                requestFunc: Request,
                                filterFunc: RequestFilterTimeline,
                                buttonClass: 'homeTimelineButton',
                                buttonMessage: 'Get Home Timeline',
                                filterButtonClass: 'filterButton',
                                filterButtonMessage: 'Filter',
                                buttonDisabled: true,
                                textBoxClass: "textInput",
                                updateCallback: this.update
                                }),
                e('div', { className: "dataHome" }, component));
    }
}

export default HomeTimeline;