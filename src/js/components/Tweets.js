import React from 'react';
import _ from 'lodash';
import User from './User';
import Message from './Message';

const e = React.createElement;

class Tweets extends React.Component {
    render() {
        return e('div', { className: "item" },
                e(User, {user: this.props.json.user , excludeHandle: this.props.excludeHandle}),
                Message(this.props.json));
    }
}

export default Tweets;