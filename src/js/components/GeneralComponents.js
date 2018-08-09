import React from 'react';

const e = React.createElement;

const Header = (headerTitle) => {
    return e('h1', {}, headerTitle);
}

class Status extends React.Component {
    render() {
        return e('div', { className: this.props.className }, this.props.message);
    }
}

const Pending = () => {
    return e(Status, { message: 'Pending . . .' });
}

const Error = (errorText) => {
    return e(Status, { className: 'errorMessage', message: errorText });
}

const Button = (buttonClass, onclick, buttonMessage) => {
    return e('button', { className: buttonClass, onClick: onclick }, buttonMessage);
}

export {Header, Pending, Error, Button};