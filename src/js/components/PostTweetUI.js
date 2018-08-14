import React from 'react';
import _ from 'lodash';
import {PostToTwitter} from '../services/httpCall';
import {Button, TextBox} from './GeneralComponents';

const e = React.createElement;

let textBox;

class PostTweetUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            postMsgLength: 0,
            returnMessage: null
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
            let ret;
            if(_.startsWith(message, "Oops")) {
                ret = "Post Failed!";
            } else {
                ret = "Post Success!";
            }

            this.setState({
                returnMessage: ret
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

        return e('div', {className: "UIContent"},
                TextBox(textBoxProperties),
                Button(buttonProperties),
                e('div', {className: "charCounter"}, "Char Count: " + this.state.postMsgLength),
                e('div', {className: "returnMessage"}, this.state.returnMessage));
    }
}

export default PostTweetUI;