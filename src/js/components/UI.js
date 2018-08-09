import Timeline from './Timeline';
import React from 'react';
import {Request, RequestUserTimeline, RequestFilterTimeline} from '../services/httpCall';

const e = React.createElement;

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

class UI extends React.Component {
    render() {
        let homeTimeline = e(Timeline, {
                               header: 'Home Timeline',
                               TLUIContainerClass: 'homeTLUIContainer',
                               buttonClass: 'homeTimelineButton',
                               buttonMessage: 'Get Home Timeline',
                               dataClass: 'dataHome',
                               requestFunc: Request,
                               filterButtonClass: "filterButton",
                               filterButtonMessage: "Filter",
                               filterFunc: RequestFilterTimeline,
                               textBoxClass: "textInput"
                           });

        let userTimeline = e(Timeline, {
                               displayUserTimeline: true,
                               header: 'User Timeline',
                               TLUIContainerClass: 'userTLUIContainer',
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