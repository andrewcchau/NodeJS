import React from 'react';
import _ from 'lodash';
import User from './User';
import Message from './Message';

const e = React.createElement;

const Tweet = (properties) => {
    if(properties && properties.jsonObj) {
        let jsonObj = properties.jsonObj;
        return e('div', {className: "tweet", key: jsonObj.id},
                e(User, {user: jsonObj.user, excludeHandle: properties.excludeHandle}),
                e(Message, {jsonObj: jsonObj, openModal: properties.openModal}));
    } else {
        return e('div', {className: "tweet"}, e(User), e(Message))
    }
}

class Tweets extends React.Component {
    render() {
       if(this.props.tweets) {
            return _.map(this.props.tweets, (jsonObj) => {
                let properties = {
                    jsonObj: jsonObj,
                    excludeHandle: this.props.excludeHandle,
                    openModal: this.props.openModal
                }
                return (jsonObj ? Tweet(properties) : null)
            });
        } else {
            return e(Tweet());
        }
    }
}

export default Tweets;
export {Tweets, Tweet};