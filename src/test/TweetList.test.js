import {shallow} from 'enzyme';
import React from 'react';
import {Pending, Error, Button, TweetList} from '../js/components/TweetList';

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
        const wrapper = shallow(Error());
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
        expect(wrapper.text()).toEqual(message);
    });
});

describe('Button Test Valid Inputs + Simulate Click', () => {
    it('Should create a button with a message and callback function', () => {
        const wrapper = shallow(Button(() => dummyFunction(), message));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(message);
        wrapper.find('button').simulate('click');
        expect(counter).toEqual(1);
    });
});


/* Test TweetList Component */
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

describe('TweetList Test No Input', () => {
    it('Should have children components but nothing else', () => {
        const wrapper = shallow(e(TweetList));
        expect(wrapper.find('div').length).toEqual(3);
        expect(wrapper.childAt(0).hasClass('buttonContainer')).toEqual(true);
        expect(wrapper.childAt(1).hasClass('data')).toEqual(true);
        expect(wrapper.childAt(1).children().length).toEqual(1);
    });
});

/* Todo: FIX TESTS NOW THAT BUTTON DOESN'T HAVE A CALLBACK */
describe('TweetList Test Valid Inputs and Button Press', () => {
    it('Should have proper children components after button press', () => {
        const wrapper = shallow(e(TweetList));
        expect(wrapper.find('div').length).toEqual(3);
        wrapper.find('button').simulate('click');
        expect(wrapper.find('div').length).toEqual(9);

        let itemElem = wrapper.childAt(1).childAt(0);
        expect(itemElem.children().length).toEqual(2);
        expect(itemElem.hasClass('item')).toEqual(true);
        expect(itemElem.childAt(0).hasClass('user')).toEqual(true);
        expect(itemElem.childAt(1).hasClass('message')).toEqual(true);

        let userElem = itemElem.childAt(0);
        let messageElem = itemElem.childAt(1);
        expect(userElem.childAt(1).text()).toEqual(handle);
        expect(userElem.childAt(2).text()).toEqual(name);
        expect(messageElem.childAt(0).text()).toEqual('Dec 17');
        expect(messageElem.childAt(1).text()).toEqual(message);
    });
});