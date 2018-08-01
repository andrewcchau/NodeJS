import configure from '../setupTests';
import {shallow} from 'enzyme';
import React from 'react';
import {Pending, Error, Button, TweetList} from '../js/components/TweetList';

let message = "button message";
const e = React.createElement;

/* Test Pending Component */
describe('Pending Test', () => {
    it('Should create a div with "Pending . . ." child', () => {
        const wrapper = shallow(Pending());
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.contains('Pending . . .')).toEqual(true);
    });
});

/* Test Error Component */
describe('Error Test', () => {
    it('Should create a div with an error message', () => {
        const wrapper = shallow(Error());
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('errorMessage')).toEqual(true);
        expect(wrapper.contains('Something went wrong. Please come back later!'));
    });
});


/* Test Button Component */
let counter = 0;
const dummyFunction = () => {
    counter++;
}

describe('Button Test No Input', () => {
    it('Should create a button with no message', () => {
        const wrapper = shallow(Button());
        expect(wrapper.find('button').length).toEqual(1);
        expect(wrapper.hasClass('timelineButton')).toEqual(true);
        expect(wrapper.props().onClick).toEqual(undefined);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Button Test Message Only', () => {
    it('Should create a button with a message', () => {
        const wrapper = shallow(Button(null, message));
        expect(wrapper.props().onClick).toEqual(null);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.contains(message)).toEqual(true);
    });
});

describe('Button Test Valid Inputs + Simulate Click', () => {
    it('Should create a button with a message and callback function', () => {
        const wrapper = shallow(Button(() => dummyFunction(), message));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.contains(message)).toEqual(true);
        wrapper.find('button').simulate('click');
        expect(counter).toEqual(1);
    });
});


/* Test TweetList Component */
describe('TweetList Test No Input', () => {
    it('Should have children components but nothing else', () => {
        const wrapper = shallow(e(TweetList));
        expect(wrapper.find('div').length).toEqual(3);
    });
});