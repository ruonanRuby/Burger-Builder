import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import Item from './singleItem/singleItem';

configure({adapter: new Adapter()});

describe('<NavItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    })
    it('should render two <Item /> elements if not authenticated', () => {
        expect(wrapper.find(Item)).toHaveLength(2);
    });

    it('should render three <Item /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(Item)).toHaveLength(3);
    });

    it('should show logout button if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<Item link="/logout">Logout</Item>)).toEqual(true);
    });
});