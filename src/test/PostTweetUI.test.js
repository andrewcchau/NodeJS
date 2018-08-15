import {shallow} from 'enzyme';
import React from 'react';
import PostTweetUI from '../js/components/PostTweetUI';

const e = React.createElement;


describe('Post Tweet UI Test Render Everything', () => {
    it('Should create a TextArea, a Button, and a counter', () => {
        const wrapper = shallow(e(PostTweetUI));
        expect(wrapper.hasClass('UIContent PostTweet')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.find('div').length).toEqual(4);
        expect(wrapper.find('button').length).toEqual(1);

        /* TextArea */
        let child = wrapper.childAt(0);
        expect(child.hasClass('postTextArea')).toEqual(true);
        expect(child.props().rows).toEqual(6);
        expect(child.props().cols).toEqual(50);
        expect(child.props().placeholder).toEqual('Enter Tweet');

        /* Char Counter */
        child = wrapper.childAt(1).childAt(0);
        expect(child.hasClass('charCounter')).toEqual(true);
        expect(child.text()).toEqual('Character Count: 0');

        /* Post Button */
        child = wrapper.childAt(1).childAt(2);
        expect(child.hasClass('postButton')).toEqual(true);
        expect(child.props().disabled).toEqual(true);
        expect(child.text()).toEqual('Post Tweet');
    });
});