import React from 'react';
import ReactDOM from 'react-dom';
import UI from './components/UI';

const e = React.createElement;

const init = () => {
    /* Location to Render */
    let location = document.getElementsByClassName("interfaceInsert") && document.getElementsByClassName("interfaceInsert")[0];

    let uiContainer = e(UI);

    /* Render Everything */
    ReactDOM.render(
        uiContainer,
        location
    );

    /* Disable the filter button as work around */
    let button = document.getElementsByClassName("filterButton") && document.getElementsByClassName("filterButton")[0];
    button.disabled = true;
}

window.onload = () => {
    init();
}