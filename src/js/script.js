const React = require('react');
const ReactDOM = require('react-dom');

const e = React.createElement;


const Title = (title) => {
    return e('div', { className: "title" }, title);
}

const Button = (onclick, buttonMessage) => {
    return e('button', { className: "timelineButton", onClick: onclick }, buttonMessage);
}

class Status extends React.Component {
    render() {
        return e('div', { className: this.props.className }, this.props.message);
    }
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


const Pending = () => {
    return e(Status, { message: 'Pending . . .' });
}

const Error = () => {
    return e(Status, { className: 'errorMessage', message: 'Something went wrong. Please come back later!' });
}

class TweetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            status: Pending()
        }
        this.update();
    }

    update() {
        let xhttp = new XMLHttpRequest();
        let stat = Error();

        xhttp.onreadystatechange = () => {
            let dataElem = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];
            if(dataElem != null) {
                if(xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
                    this.changeTimeline(JSON.parse(xhttp.responseText));
                } else if(xhttp.readyState == xhttp.OPENED || xhttp.readyState == xhttp.HEADERS_RECEIVED
                            || xhttp.readyState == xhttp.LOADING) {
                    stat = Pending();
                    this.changeTimeline(null);
                } else {
                    this.changeTimeline(null);
                }
            }

            this.setState({
                status: stat
            });
        };

        xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
        xhttp.send();
    }

    changeTimeline(jsonList) {
        if(jsonList != null) {
            this.setState({
                tweets: jsonList.map(i => e('div', { className: "item" }, User(i.user), Message(i)))
            });
        } else {
            this.setState({
                tweets: []
            });
        }
    }

    render() {
        let append;
        if(!isEmpty(this.state.tweets)) {
            append = this.state.tweets;
        } else if(this.state.status != null) {
            append = this.state.status;
        } else {
            append = Error();
        }

        return e('div', {},  e('div', { className: "buttonContainer" }, Button(() => this.update(), "Get Timeline")), e('div', { className: "data" }, append));
    }
}

/* Utility function to check if array is empty */
const isEmpty = (array) => {
    for(let i in array) {
        if(array.hasOwnProperty(i)) {
            return false;
        }
    }

    return true;
}

const init = () => {
    /* Render Title */
    let title = Title("Lab for Andrew");

    /* Location to Render */
    let location = document.getElementsByClassName("interfaceInsert") && document.getElementsByClassName("interfaceInsert")[0];

    /* Render timeline */
    let timeline = e(TweetList);

    /* Render Everything */
    ReactDOM.render(
        [title, timeline],
        location
    );
}

window.onload = () => {
    init();
}