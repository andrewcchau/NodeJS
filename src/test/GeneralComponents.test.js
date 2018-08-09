import {shallow} from 'enzyme';
import React from 'react';
import {Pending, Error, Button, Header} from '../js/components/GeneralComponents';

const e = React.createElement;

let message = "button message",
    handle = "TesterHandle",
    name = "Tester",
    img = "https://http.cat/404",
    date = "December 17, 1995 03:24:00",
    id = "123456";

/* Test Pending Component */
describe('Pending Test', () => {
    it('Should create a div with "Pending . . ." child', () => {
        const wrapper = shallow(Pending());
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.text()).toEqual('Pending . . .');
    });
});

/* Test Error Component */
describe('Error Test', () => {
    it('Should create a div with an error message', () => {
        const wrapper = shallow(Error('Something went wrong. Please come back later!'));
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('errorMessage')).toEqual(true);
        expect(wrapper.text()).toEqual('Something went wrong. Please come back later!');
    });
});


/* Test Button Component */
let counter = 0;
const dummyFunction = () => {
    counter++;
}

describe('Button Test No Input', () => {
    it('Should create a button with no message', () => {
        const wrapper = shallow(Button('timelineButton'));
        expect(wrapper.find('button').length).toEqual(1);
        expect(wrapper.hasClass('timelineButton')).toEqual(true);
        expect(wrapper.props().onClick).toEqual(undefined);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Button Test Message Only', () => {
    it('Should create a button with a message', () => {
        const wrapper = shallow(Button(null, null, message));
        expect(wrapper.props().onClick).toEqual(null);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(message);
    });
});

describe('Button Test Valid Inputs + Simulate Click', () => {
    it('Should create a button with a message and callback function', () => {
        const wrapper = shallow(Button(null, () => dummyFunction(), message));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(message);
        wrapper.find('button').simulate('click');
        expect(counter).toEqual(1);
    });
});


/* Test Header Component */
describe('Header Test No Input', () => {
    it('Should create a header element with empty h1', () => {
        const wrapper = shallow(Header());
        expect(wrapper.find('h1').length).toEqual(1);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Header Test Valid Input', () => {
    it('Should create a header element with filled in h1', () => {
        const headerMessage = "Test Header";
        const wrapper = shallow(Header(headerMessage));
        expect(wrapper.text()).toEqual(headerMessage);
    });
});