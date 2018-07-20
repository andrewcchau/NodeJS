function redirect(l) {
    window.open(l, '_blank');
}

function apiCall() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == xhttp.DONE && this.status == 200) {
            document.getElementById("data").innerHTML = '';
            blockify(this.responseText);
        } else if(this.readyState == xhttp.OPENED || this.readyState == xhttp.HEADERS_RECEIVED
                    || this.readyState == xhttp.LOADING) {
            document.getElementById("data").innerHTML = "Pending . . .";
        } else {
            document.getElementById("data").innerHTML = "Received nothing from server";
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

function blockify(s) {
    var json = JSON.parse(s);

    for(var i in json) {
        var divContainer = document.createElement("div");
        var userContainer = document.createElement("div");
        var messageContainer = document.createElement("div");

        var img = document.createElement("img");
        var handleContainer = document.createElement("div");
        var nameContainer = document.createElement("div");
        var dateContainer = document.createElement("div");
        var hyperlink = document.createElement("a");

        var date = document.createTextNode(new Date(json[i].createdAt).toLocaleString());
        var content = document.createTextNode(json[i].twitterMessage);
        var handleText = document.createTextNode(json[i].user.twitterHandle);
        var nameText = document.createTextNode(json[i].user.name);

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

        document.getElementById("data").appendChild(divContainer);
    }
}
