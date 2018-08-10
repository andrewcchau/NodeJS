import {shallow, mount} from 'enzyme';
import React from 'react';
import Timeline from '../js/components/Timeline';
import Tweets from '../js/components/Tweets';

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
        const wrapper = shallow(e(Timeline, {header: 'Home Timeline',
                                             TLUIContainerClass: 'buttonContainer1',
                                             buttonClass: 'homeTimelineButton',
                                             buttonMessage: 'Get Home Timeline',
                                             dataClass: 'dataHome'}));
        expect(wrapper.find('div').length).toEqual(2);
        expect(wrapper.childAt(0).childAt(0).text()).toEqual("Home Timeline");
        expect(wrapper.childAt(1).hasClass('buttonContainer1')).toEqual(true);
        expect(wrapper.childAt(2).hasClass('dataHome')).toEqual(true);
        expect(wrapper.childAt(2).children().length).toEqual(1);
    });
});

describe('Home Timeline Button Press Test', () => {
    it('Should have proper children components after button press', () => {
        const wrapper = mount(e(Timeline, {   requestFunc: callBackFunc,
                                                header: 'Home Timeline',
                                                TLUIContainerClass: 'buttonContainer1',
                                                buttonClass: 'homeTimelineButton',
                                                buttonMessage: 'Get Home Timeline',
                                                dataClass: 'dataHome'}));
        expect(wrapper.find('div').length).toEqual(4);
        wrapper.childAt(0).childAt(1).childAt(0).childAt(0).find('button').simulate('click');
        expect(wrapper.find('div').length).toEqual(9);
    });
});

describe('User Timeline Test No Input', () => {
    it('Should have children components but nothing else', () => {
        const wrapper = shallow(e(Timeline, { displayUserTimeline: true,
                                                header: 'User Timeline',
                                                TLUIContainerClass: 'buttonContainer2',
                                                buttonClass: 'userTimelineButton',
                                                buttonMessage: 'Get User Timeline',
                                                dataClass: 'dataUser'}));
        expect(wrapper.find('div').length).toEqual(2);
        expect(wrapper.childAt(0).childAt(0).text()).toEqual("User Timeline");
        expect(wrapper.childAt(1).hasClass('buttonContainer2')).toEqual(true);
        expect(wrapper.childAt(2).hasClass('dataUser')).toEqual(true);
        expect(wrapper.childAt(2).children().length).toEqual(1);
    });
});

describe('User Timeline Button Press Test', () => {
    it('Should have proper children components after button press', () => {
        const wrapper = mount(e(Timeline, { displayUserTimeline: true,
                                                requestFunc: callBackFunc,
                                                header: 'User Timeline',
                                                TLUIContainerClass: 'buttonContainer2',
                                                buttonClass: 'userTimelineButton',
                                                buttonMessage: 'Get User Timeline',
                                                dataClass: 'dataUser'}));
        expect(wrapper.find('div').length).toEqual(4);
        wrapper.find('button').simulate('click');
        expect(wrapper.find('div').length).toEqual(8);
    });
});