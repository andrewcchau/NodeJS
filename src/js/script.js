const React = require('react');
const ReactDOM = require('react-dom');

const e = React.createElement;

window.onload = () => {
    init();
}

const renderUI = (items, location) => {
    ReactDOM.render(
        items,
        location);
}

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

const Button = (onclick, buttonMessage) => {
    return e('button', { className: "timelineButton", onClick: onclick }, buttonMessage);
}

const ButtonContainer = (onclick, buttonMessage) => {
    return e('div', { className: "buttonContainer" }, Button(onclick, buttonMessage));
}

const DataContainer = () => {
    return e('div', { className: "data" });
}

const init = () => {
    /* Render Title */
    let title = Title("Lab for Andrew");

    /* Render the Button */
    let button = ButtonContainer(() => apiCall(), "Get Timeline" );

    /* Render the placement divs */
    let dataContainer = DataContainer();

    /* Location to Render */
    let location = document.getElementsByClassName("interfaceInsert") && document.getElementsByClassName("interfaceInsert")[0];

    /* Render Everything */
    renderUI([title, button, dataContainer], location);
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

            renderUI(insert, dataElem);
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

const MessageDate = (date) => {
    let msgDate;
    /* Parse the date into human-readable format */
    if(date != null) {
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

const Image = (src) => {
    return e('img', { src: src }, null);
}

const Handle = (handle) => {
    return e('div', { className: "twitterHandle" }, handle);
}

const Name = (name) => {
    return e('div', { className: "twitterName" }, name);
}

const User = (user) => {
    return e('div', { className: "user" },
        Image(user.profileImageURL), Handle(user.twitterHandle), Name(user.name));
}

class TweetList extends React.Component {
    render() {
        return this.props.jsonList.map(i => e('div', { className: "item" }, User(i.user), Message(i)));
    }
}

const blockify = (s) => {
    let json = JSON.parse(s);
    let timelineContainer = e(TweetList, {jsonList: json});
    return timelineContainer;
}