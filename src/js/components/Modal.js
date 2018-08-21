import React from 'react';
import _ from 'lodash';
import {TextAreaAndButton} from './GeneralComponents';
import {ReplyToTweet} from '../services/httpCall';
import {Tweet} from './Tweets';

const e = React.createElement;

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMsgLength: 0,
            returnMessage: null,
            retAppend: "",
            textBox: null,
            content: this.props.content
        }

        this.updateReturnMessage = this.updateReturnMessage.bind(this);
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("modalTextArea");
        this.setState({
            textBox: tbClass && tbClass[0]
        })
        this.props.sendTextBox(this.state.textBox);
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
            username = jsonObj.user.twitterHandle;
        }

        let modalButtonProps = {
            className: "modalReplyButton" + (this.state.modalMsgLength > 0 ? " active" : ""),
            key: "modalReplyButton",
            message: "Submit",
            disabled: (this.state.modalMsgLength > 0 ? false: true),
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
            messageLength: this.state.modalMsgLength,
            onKeyUp: () => this.updateUI(),
        }

        let textAreaAndButtonProps = {
            textAreaProperties: modalTextAreaProps,
            buttonWrapperProperties: {
                className: "modalReplyButtonWrapper",
                returnMessageClass: "modalReturnMessage" + this.state.retAppend,
                returnMessage: this.state.returnMessage
            },
            buttonProperties: modalButtonProps
        }

        let modal = e('div', {className: "modal"},
                        e('span', {className: "modalCloseButton", onClick: () => this.props.displayModal(false)}, "x"),
                        Tweet({jsonObj:jsonObj}),
                        TextAreaAndButton(textAreaAndButtonProps)
                        );

        return e('div', {className: "modalWrapper"}, modal);
    }
}

export default Modal;