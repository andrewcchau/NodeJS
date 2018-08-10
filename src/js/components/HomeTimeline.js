import React from 'react';
import _ from 'lodash';
import Tweets from './Tweets';
import TimelineUI from './TimelineUI';
import {Request, RequestFilterTimeline} from '../services/httpCall';
import {Header, Mismatch, Pending, Error, statusEnum, Button, TextBox} from './GeneralComponents';
import FilterUI from './FilterUI';

const e = React.createElement;
const textBoxClass = "textInput";

class HomeTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: statusEnum.PENDING,
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
        let extraComponent = e(FilterUI, {update: this.update, textBoxClass: 'textInput'});

        if(this.state.tweets && !_.isEmpty(this.state.tweets)) {
            component = e(Tweets, { tweets: this.state.tweets });
        } else if(_.isEqual(this.state.status, statusEnum.NO_MATCH)) {
            component = Mismatch("No tweets match your search query.");
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else {
            component = Error('Something went wrong. Please come back later!');
        }

        if(this.props.test) {
            return e('div', {},
                    e('header', {}, Header("Home Timeline")),
                    e(TimelineUI, { className: 'homeTLUIContainer',
                                    requestFunc: this.props.requestFunc,
                                    filterFunc: this.props.filterFunc,
                                    buttonClass: 'homeTimelineButton',
                                    buttonMessage: 'Get Home Timeline',
                                    updateCallback: this.update,
                                    extraComponents: extraComponent
                                    }),
                    e('div', { className: "dataHome" }, component));
        }

        return e('div', {},
                e('header', {}, Header("Home Timeline")),
                e(TimelineUI, { className: 'homeTLUIContainer',
                                requestFunc: Request,
                                filterFunc: RequestFilterTimeline,
                                buttonClass: 'homeTimelineButton',
                                buttonMessage: 'Get Home Timeline',
                                updateCallback: this.update,
                                extraComponents: extraComponent
                                }),
                e('div', { className: "dataHome" }, component));
    }
}

export default HomeTimeline;