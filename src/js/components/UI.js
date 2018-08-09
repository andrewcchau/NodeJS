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
                               header: 'Home Timeline',
                               buttonContainerClass: 'homeTLButtonContainer',
                               buttonClass: 'homeTimelineButton',
                               buttonMessage: 'Get Home Timeline',
                               dataClass: 'dataHome',
                               requestFunc: Request
                           });

        let userTimeline = e(Timeline, {
                               displayUserTimeline: true,
                               header: 'User Timeline',
                               buttonContainerClass: 'userTLButtonContainer',
                               buttonClass: 'userTimelineButton',
                               buttonMessage: 'Get User Timeline',
                               dataClass: 'dataUser',
                               requestFunc: RequestUserTimeline
                           });

        return e('div', {},
                Title("Lab for Andrew"),
                e('div', {className: "timelineWrapper"}, homeTimeline, userTimeline));
    }
}

export default UI;