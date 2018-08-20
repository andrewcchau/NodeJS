import React from 'react';
import _ from 'lodash';
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
            returnMessage: null,
            retAppend: ""
        }

        this.updateReturnMessage = this.updateReturnMessage.bind(this);
        this.setRef = this.setRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("modalTextArea");
        textBox = tbClass && tbClass[0];
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setRef(node) {
        this.ref = node;
    }

    handleClickOutside(event) {
        if(this.ref && !this.ref.contains(event.target)) {
            this.props.displayModal(false);
        }

    }

    updateUI() {
        this.setState({
            returnMessage: null,
            retAppend: ""
        })
    }

    updateReturnMessage(message) {
        if(message) {
            let success;
            if(_.isEqual(message, 200)) {
                success = true;
            } else {
                success = false;
            }

            this.setState({
                returnMessage: (success ? "Replied Successfully!" : "Failed to Reply!"),
                retAppend: (success ? " success" : " error")
            })
        } else {
            this.setState({
                returnMessage: "Failed to Reply!",
                retAppend: " error"
            })
        }
    }

    render() {
        let username = "", jsonObj = this.props.content;
        if(jsonObj) {
            username = jsonObj.user.name;
        }

        let modalButtonProps = {
            className: "modalReplyButton",
            key: "modalReplyButton",
            message: "Submit",
            onClick: () => {
                let post = {
                    statusID: (jsonObj ? jsonObj.id : null),
                    message: (textBox ? textBox.value : null)
                }
                ReplyToTweet(post, this.updateReturnMessage)
            }
        }

        let modalTextAreaProps = {
            className: "modalTextArea",
            key: "modalTextArea",
            rows: 5,
            cols: 60,
            placeholder: "Enter Reply",
            maxLength: 280 - username.length - 2,
            onKeyUp: () => this.updateUI()
        }


        let originalPost = [
            e(User, {user: jsonObj.user, key: this.props.className + " User"}),
            e(Message, {jsonObj: jsonObj, key: this.props.className + " Message"})
        ]

        let modal = e('div', {className: this.props.className, ref: this.setRef},
                        e('span', {className: this.props.className + "CloseButton", onClick: () => this.props.displayModal(false)}, "x"),
                        e('div', {className: this.props.className + "Content"}, originalPost),
                        TextArea(modalTextAreaProps),
                        e('div', {className: this.props.className + "ReplyButtonWrapper"},
                            [e('div', {className: this.props.className + "ReturnMessage" + this.state.retAppend,
                                        key: this.props.className + "ReturnMessage"}, this.state.returnMessage),
                             Button(modalButtonProps)])
                        );

        return e('div', {className: this.props.className + "Wrapper"}, modal);
    }
}

export default Modal;