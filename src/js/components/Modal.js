import React from 'react';
import {TextArea, Button} from './GeneralComponents';
import {ReplyToTweet} from '../services/httpCall';
import User from './User';
import Message from './Message';

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
        let username = "", jsonObj = this.props.content;
        if(this.props.content) {
            username = jsonObj.user.twitterHandle;
        }

        let modalButtonProps = {
            className: "modalPostButton",
            key: "modalPostButton",
            message: "Submit",
            onClick: () => {
                let post = {
                    statusID: (jsonObj ? jsonObj.id : null),
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


        let originalPost = [
            e(User, {user: jsonObj.user, key: this.props.className + " User"}),
            e(Message, {jsonObj: jsonObj, key: this.props.className + " Message"})
        ]

        return e('div', {className: this.props.className},
                    e('div', {className: this.props.className + "Content"}, originalPost),
                    e('span', {className: this.props.className + "CloseButton", onClick: () => this.props.displayModal(false)}, "x"),
                    TextArea(modalTextAreaProps),
                    Button(modalButtonProps));
    }
}

export default Modal;