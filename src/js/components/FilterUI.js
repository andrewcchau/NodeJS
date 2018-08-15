import React from 'react';
import {RequestFilterTimeline} from '../services/httpCall';
import {Button, TextBox, Pending} from './GeneralComponents';

const e = React.createElement;
let textBox, button;

class FilterUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true
        }
    }

    componentDidMount() {
        let textBoxClass = document.getElementsByClassName("textInput");
        textBox = textBoxClass && textBoxClass[0];
        let buttonClass = document.getElementsByClassName('filterButton');
        button = buttonClass && buttonClass[0];
    }

    /* Toggles the button and executes event handler */
    EnterKeyPress(event, callback) {
        if(textBox && textBox.value){
            this.setState({
                buttonDisabled: false
            });
            button.className = "filterButton active";
            if(event.keyCode == 13) {
                callback();
            }
        } else {
            this.setState({
                buttonDisabled: true
            });
            button.className = 'filterButton';
        }
    }

    render() {
        let textBoxProperties = {
            className: "textInput",
            size: 30,
            placeholder: "Enter Keyword",
            key: "textInput",
            onKeyUp: (event) => {
               this.EnterKeyPress(event, () => {
                   Pending();
                   RequestFilterTimeline(textBox.value, this.props.update);
               });
           }
        }

        let filterButtonProperties = {
            className: 'filterButton',
            message: 'Filter',
            key: 'filterButton',
            disabled: (this.state.buttonDisabled ? true : false),
            onClick: () => {
                Pending();
                RequestFilterTimeline(textBox.value, this.props.update);
            }
        }

        let components = [
            Button(filterButtonProperties),
            TextBox(textBoxProperties)]

        return components;
    }
}

export default FilterUI;