import React from 'react';
import _ from 'lodash';
import User from '../components/User';
import Message from '../components/Message';
import {Request, RequestUserTimeline} from '../services/httpCall';
import {Header, Pending, Error, Button} from './GeneralComponents';

const e = React.createElement;
const statusEnum = {
    PENDING: "Pending",
    ERROR: "Error"
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

        if(this.props.displayUserTimeline) {
            RequestUserTimeline(this.update);
        } else {
            Request(this.update);
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

    render() {
        let header,
            buttonContainerClass,
            buttonClass,
            buttonMessage,
            dataClass,
            component,
            requestFunc;

        /* Set Necessary Variables */
        if(this.props.displayUserTimeline) {
            header = 'User Timeline';
            buttonContainerClass = 'buttonContainer2';
            buttonClass = 'userTimelineButton';
            buttonMessage = 'Get User Timeline';
            dataClass = 'dataUser';
            requestFunc = RequestUserTimeline;
        } else {
            header = 'Home Timeline';
            buttonContainerClass = 'buttonContainer1';
            buttonClass = 'homeTimelineButton';
            buttonMessage = 'Get Home Timeline';
            dataClass = 'dataHome';
            requestFunc = Request
        }

        /* Set Component to Append */
        if(this.state.tweets && !_.isEmpty(this.state.tweets)) {
            if (this.props.displayUserTimeline) {
                component = _.map(this.state.tweets, (i) => {
                    return e('div', { className: "item" , key: i.id}, e(User, {user: i.user, excludeHandle: true}), Message(i));
                });
            } else {
                component = _.map(this.state.tweets, (i) => {
                    return e('div', { className: "item" , key: i.id}, e(User, {user: i.user}), Message(i));
                });
            }
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else if(this.props.displayUserTimeline && this.state.tweets && _.isEmpty(this.state.tweets)) {
            component = Error('No tweets are available, post a tweet!');
        } else {
            component = Error('Something went wrong. Please come back later!');
        }


        /* Used solely for purpose of testing, as mocking service endpoint is difficult */
        if(this.props.test && this.props.testFunc) {
            return e('div', {},
                    e('header', {}, Header(header)),
                    e('div', { className: buttonContainerClass }, Button(buttonClass, () => this.pending(() => this.props.testFunc(this.update)), buttonMessage)),
                    e('div', { className: dataClass }, component));
        }

        return e('div', {},
                e('header', {}, Header(header)),
                e('div', { className: buttonContainerClass },
                    Button(buttonClass, () => {
                        this.pending();
                        requestFunc(this.update);
                    },
                    buttonMessage)),
                e('div', { className: dataClass }, component));
    }
}

export default Timeline;