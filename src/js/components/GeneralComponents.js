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

const Button = (buttonClass, onclick, buttonMessage, disable) => {
    return e('button', { className: buttonClass, onClick: onclick, disabled: (disable ? true : false) }, buttonMessage);
}

const TextBox = (textBoxClass, size, holderText, keyUpFunction) => {
    return e('input', {className: textBoxClass, size: size, placeholder: holderText, onKeyUp: keyUpFunction});
}

//class TimelineUI extends React.Component {
//    toggleButton() {
//
//    }
//
//    render() {
//        return e('div', { className: this.props.className },
//                Button(this.props.buttonClass, () => {
//                    this.props.pendingFunc();
//                    (this.props.requestFunc ? this.props.requestFunc(this.update) : noop );
//                }, this.props.buttonMessage),
//                (this.props.displayUserTimeline ? null : Button(this.props.filterButtonClass, () => {
//                    this.pendingFunc();
//                    (this.props.filterFunc ? this.props.filterFunc(this.update) : noop);
//                }, this.props.filterButtonMessage)),
//                (this.props.displayUserTimeline ? null : TextBox(this.props.textBoxClass, 30, "Enter Keyword", (event) => {
//                    ButtonEnable(this.props.textBoxClass, this.props.filterButtonClass);
//                    EnterKeyPress(event, () => {
//                        this.pendingFunc();
//                        (this.props.filterFunc ? this.props.filterFunc(this.update) : noop);
//                    }, this.props.textBoxClass);
//                }))
//    }
//}

export {Header, Mismatch, Pending, Error, Button, TextBox};