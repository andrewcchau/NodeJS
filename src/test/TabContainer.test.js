import {shallow} from 'enzyme';
import React from 'react';
import TabContainer from '../js/components/TabContainer';

const e = React.createElement;

describe('TabContainer 3 Children Test', () => {
    it('Should create a div with children', () => {
        const wrapper = shallow(e(TabContainer));
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('tabContainer')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.childAt(0).hasClass("tab active")).toEqual(true);
        expect(wrapper.childAt(1).hasClass("tab")).toEqual(true);
        expect(wrapper.childAt(2).hasClass("tab")).toEqual(true);
    });
});