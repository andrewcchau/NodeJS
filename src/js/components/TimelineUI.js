import React from 'react';
import {Button, TextBox} from './GeneralComponents';

const e = React.createElement;
const noop = () => {}

class TimelineUI extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.buttonDisabled) {
            this.state = {
                buttonDisabled: true
            }
        }
    }

    toggleButton() {
        let textBox = document.getElementsByClassName(this.props.textBoxClass)
                    && document.getElementsByClassName(this.props.textBoxClass)[0];
        if(textBox.value){
            this.setState({
                buttonDisabled: false
            })
        } else {
            this.setState({
                buttonDisabled: true
            });
        }
    }

    EnterKeyPress(event, callback) {
        let textBox = document.getElementsByClassName(this.props.textBoxClass)
                            && document.getElementsByClassName(this.props.textBoxClass)[0];
        if(event.keyCode == 13 && textBox.value) {
            callback();
        }
    }

    render() {
        return e('div', { className: this.props.className },
                Button(this.props.buttonClass, () => {
                    this.props.pendingFunc();
                    (this.props.requestFunc ? this.props.requestFunc(this.props.updateCallback) : noop );
                }, this.props.buttonMessage),
                (this.props.displayUserTimeline ? null : Button(this.props.filterButtonClass, () => {
                    this.props.pendingFunc();
                    (this.props.filterFunc ? this.props.filterFunc(this.props.updateCallback) : noop);
                }, this.props.filterButtonMessage, this.state.buttonDisabled)),
                (this.props.displayUserTimeline ? null : TextBox(this.props.textBoxClass, 30, "Enter Keyword", (event) => {
                    this.toggleButton();
                    this.EnterKeyPress(event, () => {
                        this.props.pendingFunc();
                        (this.props.filterFunc ? this.props.filterFunc(this.props.updateCallback) : noop);
                    });
                })));
    }
}

export default TimelineUI;