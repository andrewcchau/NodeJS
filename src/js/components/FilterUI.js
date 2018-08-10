import React from 'react';
import {RequestFilterTimeline} from '../services/httpCall';
import {Button, TextBox, Pending} from './GeneralComponents';

const e = React.createElement;

class FilterUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true
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
        let textBoxProperties = {
            boxClass: this.props.textBoxClass,
            size: 30,
            holderText: "Enter Keyword",
            key: this.props.textBoxClass
        }

        let filterButtonProperties = {
            buttonClass: 'filterButton',
            buttonMessage: 'Filter',
            key: 'filterButton',
            disable: (this.state.buttonDisabled ? true : false),
            onclick: () => {
                Pending();
                RequestFilterTimeline(this.props.update);
            }
        }

        let components = [
            Button(filterButtonProperties),
            TextBox(textBoxProperties, (event) => {
                this.toggleButton();
                this.EnterKeyPress(event, () => {
                    Pending();
                    RequestFilterTimeline(this.props.update);
                });
            })]

        return components;
    }
}

export default FilterUI;