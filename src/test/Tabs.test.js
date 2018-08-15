import {shallow} from 'enzyme';
import React from 'react';
import TabContainer from '../js/components/Tabs';

const e = React.createElement;

describe('TabContainer No Children Test', () => {
    it('Should create a div with no children', () => {
        const wrapper = shallow(e(TabContainer));
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('tabContainer')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('TabContainer Valid Children Test', () => {
    it('Should create a div with 2 children', () => {
        let child1 = e('div', {key: "testChild1", className: "child1"});
        let child2 = e('div', {key: "testChild2", className: "child2"});
        const wrapper = shallow(e(TabContainer, {children: [child1, child2]}));
        expect(wrapper.find('div').length).toEqual(2);
        expect(wrapper.find('button').length).toEqual(2);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.childAt(0).hasClass("tab")).toEqual(true);
        expect(wrapper.childAt(1).hasClass("tab")).toEqual(true);
    });
});