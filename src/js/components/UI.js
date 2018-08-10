import React from 'react';
import HomeTimeline from './HomeTimeline';
import UserTimeline from './UserTimeline';

const e = React.createElement;

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

class UI extends React.Component {
    render() {
        let homeTimeline = e(HomeTimeline);

        let userTimeline = e(UserTimeline);

        return e('div', {},
                Title("Lab for Andrew"),
                e('div', {className: "timelineWrapper"}, homeTimeline, userTimeline));
    }
}

export default UI;