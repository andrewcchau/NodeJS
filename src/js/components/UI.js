import Timeline from './Timeline';
import React from 'react';
import {Request, RequestUserTimeline} from '../services/httpCall';

const e = React.createElement;

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

class UI extends React.Component {
    render() {
        let homeTimeline = e(Timeline, {
                               header: this.props.homeHeader,
                               buttonContainerClass: this.props.homeButtonContainerClass,
                               buttonClass: this.props.homeButtonClass,
                               buttonMessage: this.props.homeButtonMessage,
                               dataClass: this.props.homeDataClass,
                               requestFunc: Request
                           });

        let userTimeline = e(Timeline, {
                               displayUserTimeline: true,
                               header: this.props.userHeader,
                               buttonContainerClass: this.props.userButtonContainerClass,
                               buttonClass: this.props.userButtonClass,
                               buttonMessage: this.props.userButtonMessage,
                               dataClass: this.props.userDataClass,
                               requestFunc: RequestUserTimeline
                           });

        return e('div', {},
                Title(this.props.title),
                e('div', {className: "timelineWrapper"}, homeTimeline, userTimeline));
    }
}

export default UI;