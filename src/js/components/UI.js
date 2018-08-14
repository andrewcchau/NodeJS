import React from 'react';
import TabContainer from './Tabs';
import HomeTimeline from './HomeTimeline';
import UserTimeline from './UserTimeline';

const e = React.createElement;

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

class UI extends React.Component {
    render() {
        let homeTimeline = e(HomeTimeline, {key: "Home Timeline"});
        let userTimeline = e(UserTimeline, {key: "User Timeline"});

        return e('div', {},
                Title("Lab for Andrew"),
                e(TabContainer, {children: [homeTimeline, userTimeline]}));
    }
}

export default UI;