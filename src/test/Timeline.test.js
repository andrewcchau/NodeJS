import {shallow} from 'enzyme';
import React from 'react';
import Timeline from '../js/components/Timeline';

const e = React.createElement;

let message = "button message",
    handle = "TesterHandle",
    name = "Tester",
    img = "https://http.cat/404",
    date = "December 17, 1995 03:24:00",
    id = "123456";

/* Test HomeTimeline Component */
const callBackFunc = (cb) => {
    cb(jsonObj);
}

const json = (message, handle, name, img, created, id) => {
    return '[{"twitterMessage":"' + message + '",' +
            '"user": {' +
                '"twitterHandle":"' + handle + '",' +
                '"name":"' + name + '",' +
                '"profileImageURL":"' + img +
            '"},' +
            '"createdAt":"' + created + '",' +
            '"id":"' + id + '"}]';
}

let jsonObj = JSON.parse(json(message, handle, name, img, date, id));

describe('Home Timeline Test No Input', () => {
    it('Should have children components but nothing else', () => {
        const wrapper = shallow(e(Timeline));
        expect(wrapper.find('div').length).toEqual(3);
        expect(wrapper.childAt(0).childAt(0).text()).toEqual("Home Timeline");
        expect(wrapper.childAt(1).hasClass('buttonContainer1')).toEqual(true);
        expect(wrapper.childAt(2).hasClass('dataHome')).toEqual(true);
        expect(wrapper.childAt(2).children().length).toEqual(1);
    });
});

describe('Home Timeline Test Valid Inputs and Button Press', () => {
    it('Should have proper children components after button press', () => {
        const wrapper = shallow(e(Timeline, {test: true, testFunc: callBackFunc}));
        expect(wrapper.find('div').length).toEqual(3);
        wrapper.find('button').simulate('click');
        expect(wrapper.find('div').length).toEqual(6);

        let itemElem = wrapper.childAt(2).childAt(0);
        expect(itemElem.children().length).toEqual(2);
        expect(itemElem.hasClass('item')).toEqual(true);
        expect(itemElem.childAt(1).hasClass('message')).toEqual(true);

        let messageElem = itemElem.childAt(1);
        expect(messageElem.childAt(0).text()).toEqual('Dec 17');
        expect(messageElem.childAt(1).text()).toEqual(message);
    });
});

describe('User Timeline Test No Input', () => {
    it('Should have children components but nothing else', () => {
        const wrapper = shallow(e(Timeline, {displayUserTimeline: true}));
        expect(wrapper.find('div').length).toEqual(3);
        expect(wrapper.childAt(0).childAt(0).text()).toEqual("User Timeline");
        expect(wrapper.childAt(1).hasClass('buttonContainer2')).toEqual(true);
        expect(wrapper.childAt(2).hasClass('dataUser')).toEqual(true);
        expect(wrapper.childAt(2).children().length).toEqual(1);
    });
});

describe('User Timeline Test Valid Inputs and Button Press', () => {
    it('Should have proper children components after button press', () => {
        const wrapper = shallow(e(Timeline, {displayUserTimeline: true, test: true, testFunc: callBackFunc}));
        expect(wrapper.find('div').length).toEqual(3);
        wrapper.find('button').simulate('click');
        expect(wrapper.find('div').length).toEqual(6);

        let itemElem = wrapper.childAt(2).childAt(0);
        expect(itemElem.children().length).toEqual(2);
        expect(itemElem.hasClass('item')).toEqual(true);
        expect(itemElem.childAt(1).hasClass('message')).toEqual(true);

        let messageElem = itemElem.childAt(1);
        expect(messageElem.childAt(0).text()).toEqual('Dec 17');
        expect(messageElem.childAt(1).text()).toEqual(message);
    });
});