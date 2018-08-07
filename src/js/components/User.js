const React = require('react');
const e = React.createElement;

const Image = (src) => {
    return e('img', { src: src }, null);
}

const Handle = (handle) => {
    return e('div', { className: "twitterHandle" }, handle);
}

const Name = (name) => {
    return e('div', { className: "twitterName" }, name);
}

const User = (user) => {
    if(user) {
        return e('div', { className: "user" },
            (user.profileImageURL ? Image(user.profileImageURL) : null),
            (user.name ? Name(user.name) : null),
            (user.twitterHandle? Handle(user.twitterHandle) : null));
    } else {
        return e('div', { className: "user" },
            Image(), Handle(), Name());
    }
}

export default User;
export {Image, Handle, Name, User};