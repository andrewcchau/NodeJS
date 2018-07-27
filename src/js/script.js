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

const redirect = (l) => {
    window.open(l, '_blank');
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
                insert = e('div', null, 'Pending . . .');
            } else {
                insert = e('div', {className: 'errorMessage'}, 'Something went wrong. Please come back later!');
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
        return e('div', { className: "date" }, '${this.props.date}');
    }
}

class MessageLink extends React.Component {
    render() {
        return e('div', { className: "messageText" , href: "${this.props.link}", target: "_blank" },
            '${this.props.message');
    }
}

class Message extends React.Component {
    render() {
        return e('div', { className: "message" },
            e(MessageDate, { date: '${this.props.date}' }, null ),
            e(MessageLink, { href: "${this.props.link}", message: '${this.props.message'}, null)
        );
    }
}

class User extends React.Component {
    render() {
        return e('div', { className: "user" },
            e('div', { src: "${this.props.srcURL}"}, null),
            e('div', { className: "twitterHandle" }, '${this.props.handle}'),
            e('div', { className: "twitterName" }, '${this.props.name}')
        );
    }
}

const blockify = (s) => {
    let json = JSON.parse(s);

    let timelineContainer = [];
    let dataContainer = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];

//    for(let i in json) {
//        if(json[i] == null) { break; }
//
//        let jsonObj = json[i];
//
//        let divContainer,
//            userContainer,
//            messageContainer,
//            img,
//            handleContainer,
//            nameContainer,
//            dateContainer,
//            hyperlink,
//            msgDate,
//            formatter,
//            content;
//
//        /* Date of the post */
//        if(jsonObj.createdAt != null) {
//            msgDate = new Date(jsonObj.createdAt);
//            formatter = new Intl.DateTimeFormat('en-US', {month: "short" });
//            dateContainer = e('div', { className: 'date' },
//                formatter.format(msgDate) + " " + msgDate.getUTCDate());
//        }
//
//        /* Message text with hyperlink */
//        if(jsonObj.twitterMessage != null && jsonObj.id != null) {
//            content = e('a',
//                { className: "messageText",
//                    href: "https://twitter.com/" +
//                            jsonObj.user.name +
//                            "/status/" +
//                            jsonObj.id,
//                    target: "_blank" },
//                jsonObj.twitterMessage);
//        }
//
//        /* Put 'message' parts into a container */
//        messageContainer = e('div', { className: "message" }, dateContainer, content)
//
//        /* User data such as profile pic, twitter handle, and twitter username */
//        if(jsonObj.user != null) {
//            if(jsonObj.user.twitterHandle != null) {
//                handleContainer = e('div', { className: "twitterHandle" }, jsonObj.user.twitterHandle);
//            }
//
//            if(jsonObj.user.name != null) {
//                nameContainer = e('div', { className: "twitterName" }, jsonObj.user.name);
//            }
//
//            if(jsonObj.user.profileImageURL != null) {
//                img = e('img', { src: jsonObj.user.profileImageURL }, null);
//            }
//        }
//
//        /* Put 'user' parts into a container */
//        userContainer = e('div', { className: "user" },
//            img, handleContainer, nameContainer);
//
//        /* Put containers together and add to array */
//        divContainer = e('div', { className: "item" , key: i}, userContainer, messageContainer);
//        timelineContainer.push(divContainer);
//    }

    for(let i in json) {
        if(json[i] == null) { break; }

        let jsonObj = json[i];

        let messageContainer, userContainer, divContainer;

        /* Create the User */
        if(jsonObj.user != null) {
            if(jsonObj.user.twitterHandle != null && jsonObj.user.name != null
                && jsonObj.user.profileImageURL != null) {
                userContainer = e(User, {
                    srcUrl: jsonObj.user.profileImageURL,
                    handle: jsonObj.user.twitterHandle,
                    name: jsonObj.user.twitterName}, null);
            }
        }

        /* Create the Message */
        if(jsonObj.createdAt != null && jsonObj.twitterMessage != null
            && jsonObj.id != null) {
            let msgDate = new Date(jsonObj.createdAt);
            let formatter = new Intl.DateTimeFormat('eng', { month: "short"});

            messageContainer = e(Message, {
                    date: formatter.format(msgDate) + " " + msgDate.getUTCDate(),
                    link: "https://twitter.com/" + jsonObj.user.name + "/status/" + jsonObj.id,
                    message: jsonObj.twitterMessage}, null);
        }

        divContainer = e('div', { className: "item", key: i}, userContainer, messageContainer);
        timelineContainer.push(divContainer);
    }

    return timelineContainer;
}