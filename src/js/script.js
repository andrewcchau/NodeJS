function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

function apiCall() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == xhttp.DONE && this.status == 200) {
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

    console.log(json);
    for(var i in json) {
        var newDiv = document.createElement("div");
        newDiv.className = "item";
        var content = document.createTextNode(new Date(json[i].createdAt).toLocaleString() + " : " + json[i].twitterMessage);

        newDiv.appendChild(content);

        var currentDiv = document.getElementById("dataInsert");
        if(isOdd(i)) {
            document.body.insertBefore(newDiv, currentDiv);
        }
        document.body.insertBefore(newDiv, currentDiv);
    }
}
