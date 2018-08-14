import React from 'react';
import {PostToTwitter} from '../services/httpCall';
import {Header, Button, TextBox} from './GeneralComponents';

const e = React.createElement;

let textBox;

class PostTweetUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            postMsgLength: 0
        }
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("postTextBox");
        textBox = tbClass && tbClass[0];
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
            boxClass: 'postTextBox',
            size: 50,
            placeholder: "Enter Tweet",
            key: "postTextBox",
        }

        let buttonProperties = {
            className: "postButton",
            key: "postButton",
            disable: this.state.buttonDisabled,
            buttonMessage: "Post Tweet",
            onclick: () => {
                PostToTwitter(textBox.value);
            }
        }

        return e('div', {},
                e('header', {}, Header('Post Tweet'),
                TextBox(textBoxProperties, (event) => this.updateUI(event)),
                Button(buttonProperties),
                e('div', {className: "charCounter"}, "Char Count: " + this.state.postMsgLength)));
    }
}

export default PostTweetUI;