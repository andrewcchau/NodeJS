const Request = (callback) => {
    let xhttp = new XMLHttpRequest();
    let ret;

    xhttp.onreadystatechange = () => {
        let dataElem = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];
        let ret;
        if(dataElem) {
            if(xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
                ret = JSON.parse(xhttp.responseText);
            } else if(xhttp.readyState == xhttp.OPENED || xhttp.readyState == xhttp.HEADERS_RECEIVED
                        || xhttp.readyState == xhttp.LOADING) {
                ret = "Pending";
            } else {
                ret = null;
            }
        }

        callback(ret);
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

export default Request;