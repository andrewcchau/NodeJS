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
    return e(Status, { className: 'resultNoneMessage', message: message });
}

const Pending = () => {
    return e(Status, { message: 'Pending . . .' });
}

const Error = (errorText) => {
    return e(Status, { className: 'errorMessage', message: errorText });
}

const Button = (properties) => {
    if(properties) {
        return e('button', { className: properties.className,
                             onClick: properties.onClick,
                             key: properties.key,
                             disabled: properties.disabled },
                         properties.message);
    } else {
        return e('button');
    }
}

const TextBox = (properties) => {
    if(properties) {
        return e('input', { className: properties.className,
                            size: properties.size,
                            placeholder: properties.placeholder,
                            key: properties.key,
                            onKeyUp: properties.onKeyUp,
                            onKeyPress: properties.onKeyPress,
                            maxLength: properties.maxLength});
    } else {
        return e('input');
    }
}

const TextArea = (properties) => {
    if(properties) {
        return e('div', {className: "textAreaWrapper"},
                e('textarea', { className: properties.className,
                                rows: properties.rows,
                                cols: properties.cols,
                                placeholder: properties.placeholder,
                                key: properties.key,
                                onKeyUp: properties.onKeyUp,
                                maxLength: properties.maxLength}),
                e('span', {className: "charCounter"}, properties.messageLength)
                );
    } else {
        return e('textarea');
    }
}

const TextAreaAndButton = (properties) => {
    if(properties) {
        let buttonWrapperProps = properties.buttonWrapperProperties;
        return e('div', {className: "textEntryWrapper"},
                    TextArea(properties.textAreaProperties),
                    e('div', {className: buttonWrapperProps.className},
                        [e('div', { className: buttonWrapperProps.returnMessageClass,
                                    key: buttonWrapperProps.returnMessageClass},
                                    buttonWrapperProps.returnMessage),
                         Button(properties.buttonProperties)
                        ])
                );
    } else {
        return e('div', {className: "textEntryWrapper"});
    }
}

const statusEnum = {
    PENDING: "Pending",
    ERROR: "Error",
    NO_MATCH: "No Match"
}

export {Header, Mismatch, Pending, Error, Button, TextBox, TextArea, statusEnum, TextAreaAndButton};