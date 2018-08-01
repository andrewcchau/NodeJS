import TweetList from './components/TweetList';
import React from 'react';
import ReactDOM from 'react-dom';
import Request from './services/httpCall';

const e = React.createElement;

const Title = (title) => {
    return e('div', { className: "title" }, title);
}

const init = () => {
    /* Render Title */
    let title = Title("Lab for Andrew");

    /* Location to Render */
    let location = document.getElementsByClassName("interfaceInsert") && document.getElementsByClassName("interfaceInsert")[0];

    /* Render timeline */
    let timeline = e(TweetList, { callBack: Request });

    /* Render Everything */
    ReactDOM.render(
        [title, timeline],
        location
    );
}

window.onload = () => {
    init();
}