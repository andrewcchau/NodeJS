import {shallow} from 'enzyme';
import React from 'react';
import HomeTimeline from '../js/components/HomeTimeline';

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
                '"profileImageURL":"' + img + '"},' +
            '"createdAt":"' + created + '",' +
            '"id":"' + id + '"}]';
}

let jsonObj = JSON.parse(json(message, handle, name, img, date, id));

describe('HomeTimeline Test No Input', () => {
    it('Should have children components but nothing else', () => {
        const wrapper = shallow(e(HomeTimeline));
        expect(wrapper.find('div').length).toEqual(3);
        expect(wrapper.childAt(0).childAt(0).text()).toEqual("Home Timeline");
        expect(wrapper.childAt(1).hasClass('buttonContainer1')).toEqual(true);
        expect(wrapper.childAt(2).hasClass('dataHome')).toEqual(true);
        expect(wrapper.childAt(2).children().length).toEqual(1);
    });
});

describe('HomeTimeline Test Valid Inputs and Button Press', () => {
    it('Should have proper children components after button press', () => {
        const wrapper = shallow(e(HomeTimeline, {test: true, testFunc: callBackFunc}));
        expect(wrapper.find('div').length).toEqual(3);
        wrapper.find('button').simulate('click');
        expect(wrapper.find('div').length).toEqual(6);

        let itemElem = wrapper.childAt(2).childAt(0);
        expect(itemElem.children().length).toEqual(2);
        expect(itemElem.hasClass('item')).toEqual(true);
        expect(itemElem.childAt(0).hasClass('user')).toEqual(true);
        expect(itemElem.childAt(1).hasClass('message')).toEqual(true);

        let userElem = itemElem.childAt(0);
        let messageElem = itemElem.childAt(1);
        expect(userElem.childAt(1).text()).toEqual(name);
        expect(userElem.childAt(2).text()).toEqual(handle);
        expect(messageElem.childAt(0).text()).toEqual('Dec 17');
        expect(messageElem.childAt(1).text()).toEqual(message);
    });
});