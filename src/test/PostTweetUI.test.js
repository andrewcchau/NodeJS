import {shallow} from 'enzyme';
import React from 'react';
import PostTweetUI from '../js/components/PostTweetUI';

const e = React.createElement;


describe('Post Tweet UI Test Render Everything', () => {
    it('Should create a TextArea, a Button, and a counter', () => {
        const wrapper = shallow(e(PostTweetUI));
        expect(wrapper.hasClass('UIContent PostTweet')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.find('div').length).toEqual(5);
        expect(wrapper.find('span').length).toEqual(1);
        expect(wrapper.find('button').length).toEqual(1);

        /* TextArea */
        let entryWrapper = wrapper.childAt(0);
        expect(entryWrapper.hasClass('textEntryWrapper')).toEqual(true);
        expect(entryWrapper.children().exists()).toEqual(true);

        let textAreaWrapper = entryWrapper.childAt(0);
        expect(textAreaWrapper.hasClass('textAreaWrapper')).toEqual(true);

        let postTextArea = textAreaWrapper.childAt(0);
        expect(postTextArea.hasClass('postTextArea')).toEqual(true);
        expect(postTextArea.props().rows).toEqual(6);
        expect(postTextArea.props().cols).toEqual(50);
        expect(postTextArea.props().placeholder).toEqual('Enter Tweet');

        /* Char Counter */
        let charCtr = textAreaWrapper.childAt(1);
        expect(charCtr.hasClass('charCounter')).toEqual(true);
        expect(charCtr.text()).toEqual('0');

        /* Post Button */
        let postButton = entryWrapper.childAt(1).childAt(1);
        expect(postButton.hasClass('postButton')).toEqual(true);
        expect(postButton.props().disabled).toEqual(true);
        expect(postButton.text()).toEqual('Post Tweet');
    });
});