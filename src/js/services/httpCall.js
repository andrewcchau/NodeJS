const Request = (callback) => {
    return fetch('http://localhost:8080/api/1.0/twitter/timeline')
        .then(res => res.json())
        .then(data => callback(data), callback(null))
        .catch(() => callback(null));
}

const RequestUserTimeline = (callback) => {
    return fetch('http://localhost:8080/api/1.0/twitter/usertimeline')
            .then(res => res.json())
            .then(data => callback(data), callback(null))
            .catch(() => callback(null));
}

export default Request;
export {Request, RequestUserTimeline};