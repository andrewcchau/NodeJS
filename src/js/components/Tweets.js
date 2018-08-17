import React from 'react';
import _ from 'lodash';
import User from './User';
import Message from './Message';

const e = React.createElement;

class Tweets extends React.Component {
    render() {
       if(this.props.tweets) {
            return _.map(this.props.tweets, (jsonObj) =>
                (jsonObj ? e('div', { className: "item", key: jsonObj.id },
                    e(User, {user: jsonObj.user , excludeHandle: this.props.excludeHandle}),
                    e(Message, {jsonObj: jsonObj, openModal: this.props.openModal})) : null)
            );
        } else {
            return e('div', { className: "item" }, e(User), Message());
        }
    }
}

export default Tweets;