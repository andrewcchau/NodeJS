import React from 'react';
import {Button} from './GeneralComponents';

const e = React.createElement;

const MessageDate = (date) => {
    let msgDate;
    /* Parse the date into human-readable format */
    if(date) {
        let formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
        msgDate = new Date(date);
        msgDate = formatter.format(msgDate) + " " + msgDate.getUTCDate();
    }

    return e('div', { className: "date" }, msgDate);
}

const MessageLink = (user, id, message) => {
    let link;
    if(user && id) {
        link = "https://twitter.com/" + user + "/status/" + id;
    } else {
        link = "https://twitter.com";
    }

    return e('a', { className: "messageText", href: link, target: "_blank" }, message);
}


class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let replyButtonProps = {
            className: "replyButton",
            key: "replyButton",
            message: "Reply",
            onClick: () => this.props.openModal(true, this.props.jsonObj)
        }

        if(this.props.jsonObj) {
            return e('div', { className: "message" },
                MessageDate(this.props.jsonObj.createdAt),
                MessageLink(this.props.jsonObj.user.twitterHandle, this.props.jsonObj.id, this.props.jsonObj.twitterMessage),
                Button(replyButtonProps));
        } else {
            return e('div', { className: "message" },
                MessageDate(), MessageLink());
        }
    }
}

export default Message;
export {MessageDate, MessageLink, Message};