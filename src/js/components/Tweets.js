import React from 'react';
import _ from 'lodash';
import User from './User';
import Message from './Message';

const e = React.createElement;

class Tweets extends React.Component {
    render() {
        return _.map(this.props.tweets, (i) =>
            e('div', { className: "item", key: i.id },
                e(User, {user: i.user , excludeHandle: this.props.excludeHandle}),
                Message(i))
        );
    }
}

export default Tweets;