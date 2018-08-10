import React from 'react';
import {Button, TextBox} from './GeneralComponents';
import {Pending} from './GeneralComponents';

const e = React.createElement;
const noop = () => {}

class TimelineUI extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.buttonDisabled) {
            this.state = {
                buttonDisabled: true
            }
        } else {
            this.state = {
                buttonDisabled: false
            }
        }
    }

    toggleButton() {
        let textBox = document.getElementsByClassName(this.props.textBoxClass)
                    && document.getElementsByClassName(this.props.textBoxClass)[0];
        if(textBox && textBox.value){
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
        if(event.keyCode == 13 && textBox && textBox.value) {
            callback();
        }
    }

    render() {
        let buttonProperties = {
            buttonClass: this.props.buttonClass,
            buttonMessage: this.props.buttonMessage,
            onclick: () => {
                Pending();
                (this.props.requestFunc ? this.props.requestFunc(this.props.updateCallback) : noop);
            }
        }

        let textBoxProperties = {
            boxClass: this.props.textBoxClass,
            size: 30,
            holderText: "Enter Keyword",
        }

        /* Only create if we're not displaying user timeline */
        let filterButtonProperties;
        if(!this.props.displayUserTimeline){
            filterButtonProperties = {
                buttonClass: this.props.filterButtonClass,
                buttonMessage: this.props.filterButtonMessage,
                disable: (this.state.buttonDisabled ? true : false),
                onclick: () => {
                    Pending();
                    (this.props.filterFunc ? this.props.filterFunc(this.props.updateCallback) : noop);
                }
            }
        }

        return e('div', { className: this.props.className },
                Button(buttonProperties),
                (this.props.displayUserTimeline ? null : Button(filterButtonProperties)),
                (this.props.displayUserTimeline ? null : TextBox(textBoxProperties, (event) => {
                    this.toggleButton();
                    this.EnterKeyPress(event, () => {
                        Pending();
                        (this.props.filterFunc ? this.props.filterFunc(this.props.updateCallback) : noop)
                    });
                })));
    }
}

export default TimelineUI;