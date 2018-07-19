function apiCall() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == xhttp.DONE && this.status == 200) {
            document.getElementById("data").innerHTML = this.responseText;
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