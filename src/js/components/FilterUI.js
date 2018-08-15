import React from 'react';
import {RequestFilterTimeline} from '../services/httpCall';
import {Button, TextBox, Pending} from './GeneralComponents';

const e = React.createElement;
let textStrip, button;

class FilterUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true
        }
    }

    componentDidMount() {
        let textStripClass = document.getElementsByClassName(this.props.textStripClass);
        textStrip = textStripClass && textStripClass[0];
        let buttonClass = document.getElementsByClassName('filterButton');
        button = buttonClass && buttonClass[0];
    }

    /* Toggles the button and executes event handler */
    EnterKeyPress(event, callback) {
        if(textStrip && textStrip.value){
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
        let textStripProperties = {
            className: this.props.textStripClass,
            size: 30,
            placeholder: "Enter Keyword",
            key: this.props.textStripClass,
            onKeyUp: (event) => {
               this.EnterKeyPress(event, () => {
                   Pending();
                   RequestFilterTimeline(textStrip.value, this.props.update);
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
                RequestFilterTimeline(textStrip.value, this.props.update);
            }
        }

        let components = [
            Button(filterButtonProperties),
            TextBox(textStripProperties)]

        return components;
    }
}

export default FilterUI;