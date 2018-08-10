import React from 'react';
import {RequestFilterTimeline} from '../services/httpCall';
import {Button, TextBox, Pending} from './GeneralComponents';

const e = React.createElement;
let textBox;

class FilterUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true
        }
    }

    componentDidMount() {
        textBox = document.getElementsByClassName(this.props.textBoxClass)
                  && document.getElementsByClassName(this.props.textBoxClass)[0];
    }

    /* Toggles the button and executes event handler */
    EnterKeyPress(event, callback) {
        if(textBox && textBox.value){
            this.setState({
                buttonDisabled: false
            });
            if(event.keyCode == 13) {
                callback();
            }
        } else {
            this.setState({
                buttonDisabled: true
            });
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
                this.EnterKeyPress(event, () => {
                    Pending();
                    RequestFilterTimeline(this.props.update);
                });
            })]

        return components;
    }
}

export default FilterUI;