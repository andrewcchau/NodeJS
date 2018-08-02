const Request = (callback) => {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'http://localhost:8080/api/1.0/twitter/timeline', true);
        xhttp.onload = () => {
            let dataElem = document.getElementsByClassName("data") && document.getElementsByClassName("data")[0];

            if(dataElem) {
                if(xhttp.readyState == xhttp.DONE && xhttp.status == 200) {
                    resolve(JSON.parse(xhttp.responseText));
                }
            }
        };
        xhttp.onerror = () => reject(null);
        xhttp.send();

    }).then((data) => {
        callback(data);
    }).catch((reject) => {
        callback(reject);
    });
}

const fetching = (callback) => {
    return fetch('http://localhost:8080/api/1.0/twitter/timeline', {method: 'GET'})
        .then(res => {
            res.json().then((data) => { callback(data); });
        }).catch(() => {
            callback(null);
        });
}

export default Request;
export {fetching};