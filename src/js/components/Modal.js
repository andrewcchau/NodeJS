import React from 'react';
import {TextArea, Button} from './GeneralComponents';
import {ReplyToTweet} from '../services/httpCall';
import User from './User';
import Message from './Message';

const e = React.createElement;

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMsgLength: 0,
            returnMessage: null,
            retAppend: "",
            textBox: null
        }

        this.updateReturnMessage = this.updateReturnMessage.bind(this);
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("modalTextArea");
        this.setState({
            textBox: tbClass && tbClass[0]
        })
    }

    updateUI() {
        if(this.state.textBox && this.state.textBox.value) {
            this.setState({
                modalMsgLength: this.state.textBox.value.length
            });
        } else {
            this.setState({
                modalMsgLength: 0
            })
        }

        this.setState({
            returnMessage: null,
            retAppend: ""
        })
    }

    updateReturnMessage(statusCode) {
        if(statusCode) {
            let success;
            if(statusCode == 200) {
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
                    message: (this.state.textBox ? this.state.textBox.value : null)
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
            e(User, {user: jsonObj.user, key: "modalUser"}),
            e(Message, {jsonObj: jsonObj, key: "modalMessage"})
        ]

        let modal = e('div', {className: "modal"},
                        e('span', {className: "modalCloseButton", onClick: () => this.props.displayModal(false)}, "x"),
                        e('div', {className: "modalContent"}, originalPost),
                        TextArea(modalTextAreaProps),
                        e('span', {className:"modalCharCounter"}, this.state.modalMsgLength),
                        e('div', {className: "modalReplyButtonWrapper"},
                            [e('div', {className: "modalReturnMessage" + this.state.retAppend,
                                        key: "modalReturnMessage"}, this.state.returnMessage),
                             Button(modalButtonProps)])
                        );

        return e('div', {className: "modalWrapper"}, modal);
    }
}

export default Modal;