const Request = (callback) => {
    return fetch('http://localhost:8080/api/1.0/twitter/timeline')
        .then(res => res.json())
        .then(data => callback(data))
        .catch(() => callback(null));
}

const RequestUserTimeline = (callback) => {
    return fetch('http://localhost:8080/api/1.0/twitter/usertimeline')
            .then(res => res.json())
            .then(data => callback(data))
            .catch(() => callback(null));
}

const RequestFilterTimeline = (callback) => {
    let form = document.getElementsByClassName("textInput") && document.getElementsByClassName("textInput")[0];
    let keyword = form.value;
    return fetch('http://localhost:8080/api/1.0/twitter/tweet/filter?keyword=' +
                    (keyword ? keyword : ""))
            .then(res => res.json())
            .then(data => callback(data))
            .catch(() => callback(null));
}

export default Request;
export {Request, RequestUserTimeline, RequestFilterTimeline};