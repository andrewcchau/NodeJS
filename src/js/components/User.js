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

class User extends React.Component {
    render() {
        if(this.props.user) {
            return e('div', {className: "user"},
                Image(this.props.user.profileImageURL),
                Name(this.props.user.name),
                (this.props.excludeHandle ? null : Handle(this.props.user.twitterHandle))
            );
        } else {
            return e('div', { className: "user" },
                    Image(), Handle(), Name());
        }
    }
}

export default User;
export {Image, Handle, Name, User};