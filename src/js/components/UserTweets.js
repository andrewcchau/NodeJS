import {User} from '../components/User';
import Message from '../components/Message';
import React from 'react';
import _ from 'lodash';
import {RequestUserTimeline} from '../services/httpCall';
import {Header, Pending, Error, Button} from './GeneralComponents';

const BUTTON_MESSAGE = "Get User Timeline";
const BUTTON_CLASS = "userButton";
const e = React.createElement;
const statusEnum = {
    PENDING: "Pending",
    ERROR: "Error"
}

class UserTweets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: statusEnum.PENDING
        }
        this.update = this.update.bind(this);
        this.pending = this.pending.bind(this);
        RequestUserTimeline(this.update);
    }

    pending(callback) {
        this.setState({
            status: statusEnum.PENDING
        });
        callback();
    }

    update(jsonList) {
        if(jsonList) {
            this.setState({
                tweets: jsonList
            });
        } else {
            this.setState({
                tweets: null,
                status: statusEnum.ERROR
            });
        }
    }

    render() {
        let component;
        if(this.state.tweets) {
            if(_.isEmpty(this.state.tweets)) {
                component = Error('No tweets are available, post a tweet!');
            } else {
                component = _.map(this.state.tweets, (i) => {
                    return e('div', { className: "item" , key: i.id}, User(i.user, true), Message(i));
                });
            }
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else {
            component = Error('Something went wrong. Please come back later!');
        }

        /* Used solely for purpose of testing, as mocking service endpoint is difficult */
        if(this.props.test && this.props.testFunc) {
            return e('div', {},
                    e('header', {}, Header('User Timeline')),
                    e('div', { className: "buttonContainer2" }, Button(BUTTON_CLASS, () => this.pending(() => this.props.testFunc(this.update)), BUTTON_MESSAGE)),
                    e('div', { className: "data" }, component));
        }

        return e('div', {},
                e('header', {}, Header('User Timeline')),
                e('div', { className: "buttonContainer2" }, Button(BUTTON_CLASS, () => this.pending(() => RequestUserTimeline(this.update)), BUTTON_MESSAGE)),
                e('div', { className: "dataUser" }, component));
    }
}

export default UserTweets;