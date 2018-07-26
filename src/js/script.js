const React = require('react');
const ReactDOM = require('react-dom');

const e = React.createElement;

ReactDOM.render(
    e("div", null, "Hello React!"),
    (document.getElementsByClassName("insert") && document.getElementsByClassName("insert")[0])
);

let body = document.getElementsByTagName("body") && document.getElementsByTagName("body")[0];
if(body != null) {
    body.onload = () => { init(); }
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
        if(dataElem != null) {
            if(xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
                dataElem.innerHTML = '';
                blockify(xhttp.responseText);
            } else if(xhttp.readyState == xhttp.OPENED || xhttp.readyState == xhttp.HEADERS_RECEIVED
                        || xhttp.readyState == xhttp.LOADING) {
                dataElem.innerHTML = "Pending . . .";
            } else {
                let errorMessageContainer = document.createElement("div");
                let errorMessage = document.createTextNode("Something went wrong. Please come back later!");

                errorMessageContainer.appendChild(errorMessage);
                errorMessageContainer.className = "errorMessage";

                dataElem.innerHTML = '';
                dataElem.appendChild(errorMessageContainer);
            }
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

const blockify = (s) => {
    let json = JSON.parse(s);

    for(let i in json) {
        /* Object null check */
        if(json[i] == null) { break; }

        let jsonObj = json[i];

        /* Var creations */
        let dataContainer = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];
        let divContainer = document.createElement("div");
        let userContainer = document.createElement("div");
        let messageContainer = document.createElement("div");

        let img = document.createElement("img");
        let handleContainer = document.createElement("div");
        let nameContainer = document.createElement("div");
        let dateContainer = document.createElement("div");
        let hyperlink = document.createElement("a");

        let msgDate, formatter, date, content, handleText, nameText;

        if(jsonObj.createdAt != null) {
            msgDate = new Date(jsonObj.createdAt);
            formatter = new Intl.DateTimeFormat("eng", { month: "short" });
        }

        if(msgDate != null) {
            date = document.createTextNode(formatter.format(msgDate) + " " + msgDate.getUTCDate());
        }

        if(jsonObj.twitterMessage != null) {
            content = document.createTextNode(jsonObj.twitterMessage);
        }

        if(jsonObj.user != null) {
            if(jsonObj.user.twitterHandle != null) {
                handleText = document.createTextNode(jsonObj.user.twitterHandle);
            }

            if(jsonObj.user.name != null) {
                nameText = document.createTextNode(jsonObj.user.name);
            }

            /* Container for the user info */
            if(jsonObj.user.profileImageURL != null) {
                img.src = jsonObj.user.profileImageURL;
            }
        }

        if(handleText != null) {
            handleContainer.appendChild(handleText);
        }
        handleContainer.className = "twitterHandle";

        if(nameText != null) {
            nameContainer.appendChild(nameText);
        }
        nameContainer.className = "twitterName";

        userContainer.className = "user";
        userContainer.appendChild(img);
        userContainer.appendChild(handleContainer);
        userContainer.appendChild(nameContainer);

        /* Container for the message data */
        dateContainer.className = "date";
        dateContainer.appendChild(date);

        hyperlink.className = "messageText";
        if(nameText != null && jsonObj.id != null) {
            hyperlink.href = "https://twitter.com/" + jsonObj.user.name + "/status/" + jsonObj.id;
        }
        hyperlink.target = "_blank";
        hyperlink.appendChild(content);

        messageContainer.className = "message";
        messageContainer.appendChild(dateContainer);
        messageContainer.appendChild(hyperlink);

        /* Place containers into html*/
        divContainer.className = "item";
        divContainer.appendChild(userContainer);
        divContainer.appendChild(messageContainer);

        dataContainer.appendChild(divContainer);
    }
}