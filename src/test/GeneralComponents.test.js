import {shallow, mount} from 'enzyme';
import React from 'react';
import {Pending, Error, Button, Header, TextBox} from '../js/components/GeneralComponents';

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
let counter = 0, buttonProp;
const dummyFunction = () => {
    counter++;
}

describe('Button Test No Input', () => {
    it('Should create a button with no message', () => {
        buttonProp = {
            buttonClass: 'timelineButton'
        }
        const wrapper = shallow(Button(buttonProp));
        expect(wrapper.find('button').length).toEqual(1);
        expect(wrapper.hasClass('timelineButton')).toEqual(true);
        expect(wrapper.props().onClick).toEqual(undefined);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Button Test Message Only', () => {
    it('Should create a button with a message', () => {
        buttonProp = {
            buttonMessage: message
        }
        const wrapper = shallow(Button(buttonProp));
        expect(wrapper.props().onClick).toEqual(undefined);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(message);
    });
});

describe('Button Test Valid Inputs + Simulate Click', () => {
    it('Should create a button with a message and callback function', () => {
        buttonProp = {
            buttonMessage: message,
            onclick: () => dummyFunction()
        }
        const wrapper = shallow(Button(buttonProp));
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


/* Test Text Box Component */
let boxProp;

describe('Text Box Test No Input', () => {
    it('Should create a default text box', () => {
        const wrapper = shallow(TextBox());
        expect(wrapper.find('input').length).toEqual(1);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Text Box Test Some Input', () => {
    it('Should create a 30px wide text box', () => {
        boxProp = {
            boxClass: "testClass",
            size: 30
        }
        const wrapper = shallow(TextBox(boxProp));
        expect(wrapper.find('input').length).toEqual(1);
        expect(wrapper.hasClass("testClass")).toEqual(true);
        expect(wrapper.props().size).toEqual(30);
    });
});