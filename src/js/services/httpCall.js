const Request = (callback) => {
    let xhttp = new XMLHttpRequest();
    let ret;

    xhttp.onreadystatechange = () => {
        let dataElem = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];
        if(dataElem) {
            if(xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
                let json = JSON.parse(xhttp.responseText);
                callback(json);
            } else if(xhttp.readyState == xhttp.OPENED || xhttp.readyState == xhttp.HEADERS_RECEIVED
                        || xhttp.readyState == xhttp.LOADING) {
                callback("Pending");
            } else {
                callback(null);
            }
        }
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

export default Request;