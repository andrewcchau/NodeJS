import React from 'react';
import ReactDOM from 'react-dom';
import UI from './components/UI';

const e = React.createElement;

const init = () => {
    /* Location to Render */
    let interfaceInsert = document.getElementsByClassName("interfaceInsert");
    let location = interfaceInsert && interfaceInsert[0];

    let uiContainer = e(UI);

    /* Render Everything */
    ReactDOM.render(
        uiContainer,
        location
    );
}

window.onload = () => {
    init();
}