import {UserVerbose} from '../components/User';
import Message from '../components/Message';
import React from 'react';
import _ from 'lodash';
import {RequestUser} from '../services/httpCall';
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
        RequestUser(this.update);
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
                return e('div', { className: "item" , key: i.id}, UserVerbose(i.user.profileImageURL, i.user.name), Message(i));
            });
        } else if(_.isEqual(this.state.status, statusEnum.PENDING)) {
            component = Pending();
        } else {
            component = Error();
        }

        /* Used solely for purpose of testing, as mocking service endpoint is difficult */
        if(this.props.test && this.props.testFunc) {
            return e('div', {},
                    e('div', { className: "buttonContainer" },
                        Header('User Timeline'),
                        Button(BUTTON_CLASS, () => this.pending(() => this.props.testFunc(this.update)), BUTTON_MESSAGE)),
                    e('div', { className: "data" }, component));
        }

        return e('div', {},
                e('div', { className: "buttonContainer" },
                    Header('User Timeline'),
                    Button(BUTTON_CLASS, () => this.pending(() => RequestUser(this.update)), BUTTON_MESSAGE)),
                e('div', { className: "dataUser" }, component));
    }
}

export default UserTweets;