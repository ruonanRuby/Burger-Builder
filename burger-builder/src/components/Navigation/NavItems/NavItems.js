import React from 'react';
import './NavItems.css';
import Item from './singleItem/singleItem';

const navItem = () => (
    <ul className = "NavItems">
       <Item link="/">Burger Builder</Item>
       <Item link ="/orders">Orders</Item>
    </ul>
);

export default navItem;
