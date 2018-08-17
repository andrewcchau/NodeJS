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

    displayModal(input) {
        if(input) {
            this.setState({
                disabled: false
            });
        } else {
            this.setState({
                disabled: true
            });
        }
    }

    render() {
        let classAppend = (this.props.hidden ? " hidden" : "");

        let post = {
            statusID: (this.props.content ? this.props.content.id : null),
            message: (textBox ? textBox.value : null)
        }

        let replyButtonProps = {
            className: "replyButton",
            key: "replyButton",
            message: "Reply",
            onClick: () => this.displayModal(true)
        }

        let modalButtonProps = {
            className: "modalPostButton",
            key: "modalPostButton",
            message: "Submit",
            onClick: () => {
//                ReplyToTweet(post)
            }
        }

        let modalTextAreaProps = {
            className: "modalTextArea",
            key: "modalTextArea",
            rows: 5,
            cols: 60,
            placeholder: "Enter Reply",
            onKeyPress: () => this.checkCharCount()
        }

        return e('div', {className: this.props.className + classAppend},
                    e('div', {className: this.props.className + "Content"}),
                    e('span', {className: this.props.className + "CloseButton", onClick: () => this.displayModal(false)}, "&times;"),
                    TextArea(modalTextAreaProps),
                    Button(modalButtonProps));
    }
}

export default Modal;