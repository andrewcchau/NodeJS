import React from 'react';
import {TextArea, Button} from './GeneralComponents';
import {ReplyToTweet} from '../services/httpCall';

const e = React.createElement;

let textBox;

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: this.props.hidden
        }
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("modalTextArea");
        textBox = tbClass && tbClass[0];
    }

    checkCharCount() {
        if(textBox && textBox.value.length >= 280) {
            return false;
        }
    }

    render() {
        let username = "";
        if(this.props.content) {
            username = this.props.content.user.twitterHandle;
        }

        let modalButtonProps = {
            className: "modalPostButton",
            key: "modalPostButton",
            message: "Submit",
            onClick: () => {
                let post = {
                    statusID: (this.props.content ? this.props.content.id : null),
                    message: (textBox ? textBox.value : null)
                }
                ReplyToTweet(post)
            }
        }

        let modalTextAreaProps = {
            className: "modalTextArea",
            key: "modalTextArea",
            rows: 5,
            cols: 60,
            placeholder: "Enter Reply",
            maxLength: 280 - username.length - 2,
            onKeyPress: () => this.checkCharCount()
        }

        return e('div', {className: this.props.className},
                    e('div', {className: this.props.className + "Content"}),
                    e('span', {className: this.props.className + "CloseButton", onClick: () => this.props.displayModal(false)}, "x"),
                    TextArea(modalTextAreaProps),
                    Button(modalButtonProps));
    }
}

export default Modal;