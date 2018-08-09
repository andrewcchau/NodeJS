import React from 'react';

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

const Message = (jsonObj) => {
    if(jsonObj) {
        return e('div', { className: "message" },
            MessageDate(jsonObj.createdAt),
            MessageLink(jsonObj.user.twitterHandle, jsonObj.id, jsonObj.twitterMessage));
    } else {
        return e('div', { className: "message" },
            MessageDate(), MessageLink());
    }
}

export default Message;
export {MessageDate, MessageLink, Message};