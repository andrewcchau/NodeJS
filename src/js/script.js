import React from 'react';
import ReactDOM from 'react-dom';
import UI from './components/UI';

const e = React.createElement;

const init = () => {
    /* Location to Render */
    let location = document.getElementsByClassName("interfaceInsert") && document.getElementsByClassName("interfaceInsert")[0];

    let uiContainer = e(UI, {
                        title: "Lab for Andrew",
                        homeHeader: 'Home Timeline',
                        homeButtonContainerClass: 'homeTLButtonContainer',
                        homeButtonClass: 'homeTimelineButton',
                        homeButtonMessage: 'Get Home Timeline',
                        homeDataClass: 'dataHome',
                        userHeader: 'User Timeline',
                        userButtonContainerClass: 'userTLButtonContainer',
                        userButtonClass: 'userTimelineButton',
                        userButtonMessage: 'Get User Timeline',
                        userDataClass: 'dataUser',
                    });

    /* Render Everything */
    ReactDOM.render(
        uiContainer,
        location
    );
}

window.onload = () => {
    init();
}