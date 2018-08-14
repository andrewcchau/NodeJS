import React from 'react';
import _ from 'lodash';
import {PostToTwitter} from '../services/httpCall';
import {Button, TextBox} from './GeneralComponents';

const e = React.createElement;

let textBox;

const SpanWrapper = (elements) => {
    return e('span', {className: "postButtonWrapper"}, elements);
}

class PostTweetUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            postMsgLength: 0,
            returnMessage: null,
            retAppend: null
        }
        this.updateReturnMessage = this.updateReturnMessage.bind(this);
        this.updateUI = this.updateUI.bind(this);
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("postTextBox");
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
            returnMessage: null
        })
    }

    render() {
        let textBoxProperties = {
            className: 'postTextBox',
            rows: 6,
            cols: 50,
            placeholder: "Enter Tweet",
            key: "postTextBox",
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
                TextBox(textBoxProperties),
                SpanWrapper([e('div', {className: "charCounter", key: "charCounter"}, "Character Count: " + this.state.postMsgLength),
                            e('div', {className: "returnMessage" + this.state.retAppend, key: "returnMessage"}, this.state.returnMessage),
                            Button(buttonProperties)])
                );
    }
}

export default PostTweetUI;