import User from './User';
import Message from './Message';

const React = require('react');
const e = React.createElement;

class Status extends React.Component {
    render() {
        return e('div', { className: this.props.className }, this.props.message);
    }
}

const Pending = () => {
    return e(Status, { message: 'Pending . . .' });
}

const Error = () => {
    return e(Status, { className: 'errorMessage', message: 'Something went wrong. Please come back later!' });
}

const Button = (onclick, buttonMessage) => {
    return e('button', { className: "timelineButton", onClick: onclick }, buttonMessage);
}


class TweetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: null,
            status: Pending()
        }
        this.update();
    }

    update() {
        let xhttp = new XMLHttpRequest();
        let stat = Error();

        xhttp.onreadystatechange = () => {
            let dataElem = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];
            if(dataElem) {
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
        if(jsonList) {
            this.setState({
                tweets: jsonList
            });
        } else {
            this.setState({
                tweets: null
            });
        }
    }

    render() {
        let append;
        if(this.state.tweets) {
            append = this.state.tweets.map(i => e('div', { className: "item" , key: i.id}, User(i.user), Message(i)));
        } else if(this.state.status) {
            append = this.state.status;
        } else {
            append = Error();
        }

        return e('div', {},  e('div', { className: "buttonContainer" }, Button(() => this.update(), "Get Timeline")), e('div', { className: "data" }, append));
    }
}

export default TweetList;