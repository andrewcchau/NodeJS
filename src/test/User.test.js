import configure from '../setupTests';
import {shallow} from 'enzyme';
import {Image, Handle, Name, User} from '../js/components/User';

let img = "https://http.cat/404",
    handle = "TestHandle",
    name = "Tester";

/* Test Image Component */
describe('Image Test No Input', () => {
    it('Should create an "img" with no src', () => {
        const wrapper = shallow(Image());
        expect(wrapper.find('img').length).toEqual(1);
        expect(wrapper.props().src).toEqual(undefined);
    });
});

describe('Image Test Valid Input', () => {
    it('Should create an "img" with a src', () => {
        const wrapper = shallow(Image(img));
        expect(wrapper.props().src).toEqual(img);
    });
});


/* Test Handle Component */
describe('Handle Test No Input', () => {
    it('Should create a div with no children', () => {
        const wrapper = shallow(Handle());
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('twitterHandle')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Handle Test Valid Input', () => {
    it('Should create a div with a child', () => {
        const wrapper = shallow(Handle(handle));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(handle);
    });
});


/* Test Name Component */
describe('Name Test No Input', () => {
    it('Should create a div with no children', () => {
        const wrapper = shallow(Name());
        expect(wrapper.find('div').length).toEqual(1);
        expect(wrapper.hasClass('twitterName')).toEqual(true);
        expect(wrapper.children().exists()).toEqual(false);
    });
});

describe('Name Test Valid Input', () => {
    it('Should create a div with a child', () => {
        const wrapper = shallow(Name(name));
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.text()).toEqual(name);
    });
});


/* Test User Component */
const json = (img, handle, name) => {
    return '{"profileImageURL":"' + img + '"' +
            ',"twitterHandle":"' + handle + '"' +
            ',"name":"' + name + '"' +
            '}';
}

describe('User Test No Input', () => {
    it('Should create a nested div and img with no grandchildren', () => {
        const wrapper = shallow(User());
        expect(wrapper.children().exists()).toEqual(true);
        expect(wrapper.find('div').exists()).toEqual(true);
        expect(wrapper.find('div').length).toEqual(3);
        expect(wrapper.find('img').exists()).toEqual(true);
        expect(wrapper.find('img').length).toEqual(1);
        expect(wrapper.hasClass('user')).toEqual(true);
        expect(wrapper.childAt(0).props().src).toEqual(undefined);
        expect(wrapper.childAt(1).children().exists()).toEqual(false);
        expect(wrapper.childAt(2).children().exists()).toEqual(false);
    });
});

describe('User Test Valid Input', () => {
    it('Should create a nested div and img with appropriate grandchildren', () => {
        let jsonObj = JSON.parse(json(img, handle, name));
        const wrapper = shallow(User(jsonObj));
        expect(wrapper.childAt(0).props().src).toEqual(img);
        expect(wrapper.childAt(1).children().exists()).toEqual(true);
        expect(wrapper.childAt(1).text()).toEqual(handle);
        expect(wrapper.childAt(2).children().exists()).toEqual(true);
        expect(wrapper.childAt(2).text()).toEqual(name);
    });
});