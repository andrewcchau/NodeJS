import {shallow} from 'enzyme';
import React from 'react';
import {MessageDate, MessageLink, Message} from '../js/components/Message';

const e = React.createElement;

let user = "Tester",
    id = "12345",
    message = "Test Message",
    date = "December 17, 1995 03:24:00";

/* Test MessageDate Component */
describe('MessageDate Test No Input', () => {
    it('Should create a div with no child', () => {
        const wrapper = shallow(MessageDate());
        expect(wrapper.find('div').exists()).toEqual(true);
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('date')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('MessageDate Test Normal Input', () => {
    it('Should create a div with a date', () => {
        const wrapper = shallow(MessageDate(date));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual('Dec 17');
    });
});


/* Test MessageLink Component */
describe('MessageLink Test No Input', () => {
    it('Should create a div with no children and default link', () => {
        const wrapper = shallow(MessageLink());
        expect(wrapper.find('a').exists()).toEqual(true);
        expect(wrapper.find('a').length).toEqual(1);
        expect(wrapper.children().exists()).toEqual(false);
        expect(wrapper.hasClass('messageText')).toEqual(true);
        expect(wrapper.props().href).toEqual("https://twitter.com");
        expect(wrapper.props().target).toEqual("_blank");
    });
});

describe('MessageLink Test User Only Input', () => {
    it('Should create a div with no children and default link', () => {
        const wrapper = shallow(MessageLink(user));
        expect(wrapper.children().exists()).toEqual(false);
        expect(wrapper.props().href).toEqual("https://twitter.com");
    });
});

describe('MessageLink Test User and ID Input', () => {
    it('Should create a div with no child and custom link', () => {
        const wrapper = shallow(MessageLink(user,id));
        expect(wrapper.children().exists()).toEqual(false);
        expect(wrapper.props().href).toEqual("https://twitter.com/" + user + "/status/" + id);
    });
});

describe('MessageLink Test User, ID, and Message Input', () => {
    it('Should create a div with message and custom link', () => {
        const wrapper = shallow(MessageLink(user, id, message));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(message);
        expect(wrapper.props().href).toEqual("https://twitter.com/" + user + "/status/" + id);
    });
});


/* Test Message Component */
const json = (createdAt, handle, id, message) => {
    return '{"createdAt":"' + createdAt +
            '", "user":{"twitterHandle":"' + handle + '"}' +
            ', "id":"' + id +
            '", "twitterMessage":"' + message + '"}';
}

describe('Message Test No Input', () => {
    it('Should create a nested div and "a" with no children', () => {
        const wrapper = shallow(e(Message));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.find('div').exists()).toEqual(true);
        expect(wrapper.find('div').length).toEqual(2);
        expect(wrapper.find('a').exists()).toEqual(true);
        expect(wrapper.find('a').length).toEqual(1);
        expect(wrapper.hasClass('message')).toEqual(true);
        expect(wrapper.childAt(0).hasClass('date')).toEqual(true);
        expect(wrapper.childAt(1).hasClass('messageText')).toEqual(true);
    });
});

describe('Message Test Valid Input', () => {
    it('Should create a nested div and "a" with children', () => {
        let jsonObj = JSON.parse(json(date, user, id, message));
        const wrapper = shallow(e(Message, {jsonObj: jsonObj}));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.childAt(0).hasClass('date')).toEqual(true);
        expect(wrapper.childAt(1).hasClass('messageText')).toEqual(true);
        expect(wrapper.childAt(0).text()).toEqual('Dec 17');
        expect(wrapper.childAt(1).props().href).toEqual("https://twitter.com/" + user + "/status/" + id);
    });
});