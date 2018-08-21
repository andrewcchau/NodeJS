import {shallow} from 'enzyme';
import React from 'react';
import JsonObj from './JSONTest';
import Modal from '../js/components/Modal';

const e = React.createElement;


describe('Modal Creation Test', () => {
    it('Should create a "modalWrapper" div with accompanying child elements', () => {
        const wrapper = shallow(e(Modal, {content: JsonObj[0]}));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.find('div').length).toEqual(7);
        expect(wrapper.hasClass('modalWrapper')).toEqual(true);

        let modal = wrapper.childAt(0);
        expect(modal.hasClass('modal')).toEqual(true);
        expect(modal.children().exists()).toEqual(true);

        /* Test the rendering of all child elements */
        expect(modal.childAt(0).hasClass('modalCloseButton')).toEqual(true);
        expect(modal.childAt(0).text()).toEqual('x');
        expect(modal.childAt(1).hasClass('modalContent')).toEqual(true);
        expect(modal.childAt(1).children().exists()).toEqual(true);
        expect(modal.childAt(2).hasClass('modalTextArea')).toEqual(true);
        expect(modal.childAt(3).hasClass('modalCharCounter')).toEqual(true);
        expect(modal.childAt(4).hasClass('modalReplyButtonWrapper')).toEqual(true);
        expect(modal.childAt(4).children().exists()).toEqual(true);
    })
});