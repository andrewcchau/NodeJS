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
        return UserVerbose(user.profileImageURL, user.name, user.twitterHandle);
    }else {
        return UserVerbose();
    }
}

const UserVerbose = (img, name, handle) => {
    if(img || name || handle) {
        return e('div', { className: "user" },
            (img ? Image(img) : null),
            (name ? Name(name) : null),
            (handle ? Handle(handle) : null));
    } else {
        return e('div', { className: "user" },
            Image(), Handle(), Name());
    }
}

export default User;
export {Image, Handle, Name, User, UserVerbose};