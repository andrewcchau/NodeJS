import React from 'react';
import {PostToTwitter} from '../services/httpCall';
import {TextAreaAndButton} from './GeneralComponents';

const e = React.createElement;

class PostTweetUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postMsgLength: 0,
            returnMessage: null,
            retAppend: "",
            textBox: null
        }
        this.updateReturnMessage = this.updateReturnMessage.bind(this);
        this.updateUI = this.updateUI.bind(this);
    }

    componentDidMount() {
        let tbClass = document.getElementsByClassName("postTextArea");
        this.setState({
           textBox: tbClass && tbClass[0]
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
                returnMessage: (success ? "Post Success!" : "Post Failed!"),
                retAppend: (success ? " success" : " error")
            });
        } else {
            this.setState({
                returnMessage: "Post Failed!",
                retAppend: " error"
            })
        }
    }

    updateUI(event) {
        if(this.state.textBox && this.state.textBox.value) {
            this.setState({
                postMsgLength: this.state.textBox.value.length
            });
        } else {
            this.setState({
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
            maxLength: 280,
            messageLength: this.state.postMsgLength
        }

        let buttonProperties = {
            className: "postButton" + (this.state.postMsgLength > 0 ? " active" : ""),
            key: "postButton",
            disabled: (this.state.postMsgLength > 0 ? false : true),
            message: "Post Tweet",
            onClick: () => {
                PostToTwitter(this.state.textBox.value, this.updateReturnMessage);
            }
        }

        let textAreaAndButtonProps = {
            textAreaProperties: textBoxProperties,
            buttonWrapperProperties: {
                className: "postButtonWrapper",
                returnMessageClass: "returnMessage" + this.state.retAppend,
                returnMessage: this.state.returnMessage
            },
            buttonProperties: buttonProperties
        }

        return e('div', {className: "UIContent PostTweet"},
                TextAreaAndButton(textAreaAndButtonProps)
                );
    }
}

export default PostTweetUI;