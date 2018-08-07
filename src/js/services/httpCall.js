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

const RequestUser = (callback) => {
    return fetch('http://localhost:8080/api/1.0/twitter/user')
            .then((data) => {return data.text();})
            .then((text) =>  callback(text))
            .catch(() => callback(null));
}

export default Request;
export {Request, RequestUser, RequestUserTimeline};