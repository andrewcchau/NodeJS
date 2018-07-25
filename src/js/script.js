const init = () => {
    document.getElementsByClassName("timelineButton")[0].onclick = () => { apiCall(); }
    apiCall();
}

const redirect = (l) => {
    window.open(l, '_blank');
}

const apiCall = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        let dataElem = document.getElementsByClassName("data")[0];
        if(this.readyState == xhttp.DONE && this.status == 200) {
            dataElem.innerHTML = '';
            blockify(this.responseText);
        } else if(this.readyState == xhttp.OPENED || this.readyState == xhttp.HEADERS_RECEIVED
                    || this.readyState == xhttp.LOADING) {
            dataElem.innerHTML = "Pending . . .";
        } else {
            let errorMessageContainer = document.createElement("div");
            let errorMessage = document.createTextNode("Something went wrong. Please come back later!");

            errorMessageContainer.appendChild(errorMessage);
            errorMessageContainer.className = "errorMessage";

            dataElem.innerHTML = '';
            dataElem.appendChild(errorMessageContainer);
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

const blockify = (s) => {
    let json = JSON.parse(s);

    for(var i in json) {
        let divContainer = document.createElement("div");
        let userContainer = document.createElement("div");
        let messageContainer = document.createElement("div");

        let img = document.createElement("img");
        let handleContainer = document.createElement("div");
        let nameContainer = document.createElement("div");
        let dateContainer = document.createElement("div");
        let hyperlink = document.createElement("a");

        let msgDate = new Date(json[i].createdAt);
        let formatter = new Intl.DateTimeFormat("eng", { month: "short" });
        let date = document.createTextNode(formatter.format(msgDate) + " " + msgDate.getUTCDate());
        let content = document.createTextNode(json[i].twitterMessage);
        let handleText = document.createTextNode(json[i].user.twitterHandle);
        let nameText = document.createTextNode(json[i].user.name);

        /* Container for the user info */
        img.src = json[i].user.profileImageURL;

        handleContainer.appendChild(handleText);
        handleContainer.className = "twitterHandle";

        nameContainer.appendChild(nameText);
        nameContainer.className = "twitterName";

        userContainer.className = "user";
        userContainer.appendChild(img);
        userContainer.appendChild(handleContainer);
        userContainer.appendChild(nameContainer);

        /* Container for the message data */
        dateContainer.className = "date";
        dateContainer.appendChild(date);

        hyperlink.className = "messageText";
        hyperlink.href = "https://twitter.com/" + json[i].user.name + "/status/" + json[i].id;
        hyperlink.target = "_blank";
        hyperlink.appendChild(content);

        messageContainer.className = "message";
        messageContainer.appendChild(dateContainer);
        messageContainer.appendChild(hyperlink);

        /* Place containers into html*/
        divContainer.className = "item";
        divContainer.appendChild(userContainer);
        divContainer.appendChild(messageContainer);

        document.getElementsByClassName("data")[0].appendChild(divContainer);
    }
}

document.getElementsByTagName("BODY")[0].onload = () => { init(); }