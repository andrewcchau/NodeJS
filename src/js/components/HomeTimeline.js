import React from 'react';
import _ from 'lodash';
import User from '../components/User';
import Message from '../components/Message';
import {Request, RequestUser} from '../services/httpCall';
import {Header, Pending, Error, Button} from './GeneralComponents';

const BUTTON_MESSAGE = "Get Home Timeline";
const BUTTON_CLASS = "timelineButton";
const e = React.createElement;
const statusEnum = {
    PENDING: "Pending",
    ERROR: "Error"
}

class HomeTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: statusEnum.PENDING
        }
        this.update = this.update.bind(this);
        this.pending = this.pending.bind(this);
        Request(this.update);
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
            component = _.map(this.state.tweets, (i) => {
                return e('div', { className: "item" , key: i.id}, e(User, {user: i.user}), Message(i));
            });
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else {
            component = Error('Something went wrong. Please come back later!');
        }

        /* Used solely for purpose of testing, as mocking service endpoint is difficult */
        if(this.props.test && this.props.testFunc) {
            return e('div', {},
                    e('header', {}, Header('Home Timeline')),
                    e('div', { className: "buttonContainer1" }, Button(BUTTON_CLASS, () => this.pending(() => this.props.testFunc(this.update)), BUTTON_MESSAGE)),
                    e('div', { className: "dataHome" }, component));
        }

        return e('div', {},
                e('header', {}, Header('Home Timeline')),
                e('div', { className: "buttonContainer1" }, Button(BUTTON_CLASS, () => this.pending(() => Request(this.update)), BUTTON_MESSAGE)),
                e('div', { className: "dataHome" }, component));
    }
}

export default HomeTimeline;