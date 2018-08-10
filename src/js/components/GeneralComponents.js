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

const Mismatch = (message) => {
    return e(Status, { className: 'errorMessage', message: message });
}

const Pending = () => {
    return e(Status, { message: 'Pending . . .' });
}

const Error = (errorText) => {
    return e(Status, { className: 'errorMessage', message: errorText });
}

const Button = (properties) => {
    if(properties) {
        return e('button', { className: properties.buttonClass,
                             onClick: properties.onclick,
                             key: properties.key,
                             disabled: properties.disable },
                         properties.buttonMessage);
    } else {
        return e('button');
    }
}

const TextBox = (properties, keyUpFunction) => {
    if(properties) {
        return e('input', { className: properties.boxClass,
                            size: properties.size,
                            placeholder: properties.holderText,
                            key: properties.key,
                            onKeyUp: keyUpFunction });
    } else {
        return e('input');
    }
}

const statusEnum = {
    PENDING: "Pending",
    ERROR: "Error",
    NO_MATCH: "No Match"
}

export {Header, Mismatch, Pending, Error, Button, TextBox, statusEnum};