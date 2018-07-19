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
        var newDiv = document.createElement("div");
        var hyperlink = document.createElement("a");
        var img = document.createElement("img");
        var span = document.createElement("span");
        var date = document.createTextNode(new Date(json[i].createdAt).toLocaleString() + " : ");
        var content = document.createTextNode(json[i].twitterMessage);

        img.src = json[i].user.profileImageURL;

        span.appendChild(date);

        hyperlink.href = "https://twitter.com/" + json[i].user.name + "/status/" + json[i].Id;
        hyperlink.target = "_blank";
        hyperlink.appendChild(content);

        newDiv.className = "item";
        newDiv.appendChild(img);
        newDiv.appendChild(span);
        newDiv.appendChild(hyperlink);

        document.getElementById("data").appendChild(newDiv);
    }
}
