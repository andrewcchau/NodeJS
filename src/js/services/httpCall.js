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

const RequestFilterTimeline = (keyword, callback) => {
    if(keyword) {
        return fetch('http://localhost:8080/api/1.0/twitter/tweet/filter?keyword=' +
                        (keyword ? keyword : ""))
                .then(res => res.json())
                .then(data => callback(data, true))
                .catch(() => callback(null));
    }
}

const PostToTwitter = (content, callback) => {
    if(content) {
        let payload = new URLSearchParams();
        return fetch('http://localhost:8080/api/1.0/twitter/tweet', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURIComponent("message") + "=" + encodeURIComponent(content)
        })
        .then(res => res.json())
        .then(data => callback(data))
        .catch(() => callback(null))
    }
}

export default Request;
export {Request, RequestUserTimeline, RequestFilterTimeline, PostToTwitter};