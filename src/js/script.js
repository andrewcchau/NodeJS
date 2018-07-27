const React = require('react');
const ReactDOM = require('react-dom');

const e = React.createElement;

window.onload = () => {
    init();
}

const init = () => {
    let button = document.getElementsByClassName("timelineButton") && document.getElementsByClassName("timelineButton")[0];
    if(button != null) {
        button.onclick = () => { apiCall(); }
    }
    apiCall();
}

class Status extends React.Component {
    render() {
        return e('div', { className: this.props.className }, this.props.message);
    }
}

const apiCall = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        let dataElem = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];
        let insert;
        if(dataElem != null) {
            if(xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
                insert = blockify(xhttp.responseText);
            } else if(xhttp.readyState == xhttp.OPENED || xhttp.readyState == xhttp.HEADERS_RECEIVED
                        || xhttp.readyState == xhttp.LOADING) {
                insert = e(Status, { message: 'Pending . . .' }, null);
            } else {
                insert = e(Status, { className: 'errorMessage', message: 'Something went wrong. Please come back later!' }, null);
            }

            ReactDOM.render(
                insert,
                dataElem
            )
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

class MessageDate extends React.Component {
    render() {
        return e('div', { className: "date" }, this.props.date);
    }
}

class MessageLink extends React.Component {
    render() {
        return e('a', { className: "messageText" , href: this.props.link, target: this.props.target },
            this.props.message);
    }
}

class Message extends React.Component {
    render() {
        return e('div', { className: "message" },
            e(MessageDate, { date: this.props.date, target: this.props.target }, null ),
            e(MessageLink, { link: this.props.link, message: this.props.message }, null)
        );
    }
}

class User extends React.Component {
    render() {
        return e('div', { className: "user" },
            e('img', { src: this.props.srcURL }, null),
            e('div', { className: "twitterHandle" }, this.props.handle),
            e('div', { className: "twitterName" }, this.props.name)
        );
    }
}

class Tweet extends React.Component {
    render() {
        return e('div', { className: "item" },
            this.props.user, this.props.message);
    }
}

const blockify = (s) => {
    let json = JSON.parse(s);

    let timelineContainer = [];
    let dataContainer = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];

    for(let i in json) {
        if(json[i] == null) { break; }

        let jsonObj = json[i];

        let messageContainer, userContainer, divContainer;

        /* Create the User */
        if(jsonObj.user != null) {
            if(jsonObj.user.twitterHandle != null && jsonObj.user.name != null
                && jsonObj.user.profileImageURL != null) {
                userContainer = e(User, {
                    srcURL: jsonObj.user.profileImageURL,
                    handle: jsonObj.user.twitterHandle,
                    name: jsonObj.user.name}, null);
            }
        }

        /* Create the Message */
        if(jsonObj.createdAt != null && jsonObj.twitterMessage != null
            && jsonObj.id != null) {
            let msgDate = new Date(jsonObj.createdAt);
            let formatter = new Intl.DateTimeFormat('eng', { month: "short"});

            messageContainer = e(Message, {
                    date: formatter.format(msgDate) + " " + msgDate.getUTCDate(),
                    link: ("https://twitter.com/" + jsonObj.user.name + "/status/" + jsonObj.id),
                    target: "_blank",
                    message: jsonObj.twitterMessage}, null);
        }

        divContainer = e(Tweet, { user: userContainer, message: messageContainer}, null);
        timelineContainer.push(divContainer);
    }

    return timelineContainer;
}