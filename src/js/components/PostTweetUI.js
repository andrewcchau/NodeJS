import React from 'react';
import _ from 'lodash';
import {PostToTwitter} from '../services/httpCall';
import {Button, TextArea} from './GeneralComponents';

const e = React.createElement;

let textBox;

const DivWrapper = (elements) => {
    return e('div', {className: "postButtonWrapper"}, elements);
}

class PostTweetUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            postMsgLength: 0,
            returnMessage: null,
            retAppend: ""
        }
        this.updateReturnMessage = this.updateReturnMessage.bind(this);
        this.updateUI = this.updateUI.bind(this);
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("postTextArea");
        textBox = tbClass && tbClass[0];
    }

    updateReturnMessage(message) {
        if(message) {
            let success;
            if(_.startsWith(message, "Oops")) {
                success = false;
            } else {
                success = true;
            }

            this.setState({
                returnMessage: (success ? "Post Success!" : "Post Failed!"),
                retAppend: (success ? " success" : " error")
            });
        }
    }

    checkCharCount(event) {
        if(textBox && textBox.value.length >= 280) {
            return false;
        }
    }

    updateUI(event) {
        if(textBox && textBox.value) {
            this.setState({
                buttonDisabled: false,
                postMsgLength: textBox.value.length
            });
        } else {
            this.setState({
                buttonDisabled: true,
                postMsgLength: 0
            });
        }

        this.setState({
            returnMessage: null,
            retAppend: ""
        })
    }

    render() {
        let textBoxProperties = {
            className: 'postTextArea',
            rows: 6,
            cols: 50,
            placeholder: "Enter Tweet",
            key: "postTextArea",
            onKeyUp: (event) => this.updateUI(event),
            onKeyPress: (event) => this.checkCharCount(event),
            maxLength: 280
        }

        let buttonProperties = {
            className: "postButton",
            key: "postButton",
            disabled: this.state.buttonDisabled,
            message: "Post Tweet",
            onClick: () => {
                PostToTwitter(textBox.value, this.updateReturnMessage);
            }
        }

        return e('div', {className: "UIContent PostTweet"},
                TextArea(textBoxProperties),
                e('span', {className: "charCounter"}, this.state.postMsgLength),
                DivWrapper([e('div', {className: "returnMessage" + this.state.retAppend, key: "returnMessage"}, this.state.returnMessage),
                            Button(buttonProperties)])
                );
    }
}

export default PostTweetUI;