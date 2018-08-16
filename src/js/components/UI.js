import React from 'react';
import TabContainer from './TabContainer';

const e = React.createElement;

class UI extends React.Component {
    render() {
        return e('div', {},
                e('div', { className: "title" }, "Lab for Andrew"),
                e(TabContainer));
    }
}

export default UI;