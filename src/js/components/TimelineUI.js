import React from 'react';
import {Button} from './GeneralComponents';
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

    render() {
        let buttonProperties = {
            className: this.props.buttonClass,
            message: this.props.buttonMessage,
            onClick: () => {
                Pending();
                (this.props.requestFunc ? this.props.requestFunc(this.props.updateCallback) : noop);
            }
        }

        return e('div', { className: this.props.className },
                Button(buttonProperties),
                this.props.extraComponents);
    }
}

export default TimelineUI;