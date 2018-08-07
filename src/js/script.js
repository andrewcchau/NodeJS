import HomeTimeline from './components/HomeTimeline';
import React from 'react';
import ReactDOM from 'react-dom';
import UserTweets from './components/UserTweets';
import {RequestUser} from './services/httpCall';

const e = React.createElement;

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

const init = () => {
    /* Render Title */
    let title = Title("Lab for Andrew");

    /* Location to Render */
    let location = document.getElementsByClassName("interfaceInsert") && document.getElementsByClassName("interfaceInsert")[0];

    /* Render home timeline */
    let homeTimeline = e(HomeTimeline);

    /* Render user timeline */
    let userTimeline = e(UserTweets);

    let timelineWrapper = e('div', {className: "timelineWrapper"}, homeTimeline, userTimeline);

    /* Render Everything */
    ReactDOM.render(
        [title, timelineWrapper],
        location
    );
}

window.onload = () => {
    init();
}