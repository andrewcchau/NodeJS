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
    let link = "https://twitter.com/" + user + "/status/" + id;

    return e('a', { className: "messageText", href: link, target: "_blank" }, message);
}

const Message = (jsonObj) => {
    return e('div', { className: "message" },
        MessageDate(jsonObj.createdAt),
        MessageLink(jsonObj.user.name, jsonObj.id, jsonObj.twitterMessage));
}

export default Message;