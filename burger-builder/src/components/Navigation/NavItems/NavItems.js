import React from 'react';
import './NavItems.css';
import Item from './singleItem/singleItem';

const navItem = () => (
    <ul className = "NavItems">
       <Item link="/" active>Burger Builder</Item>
       <Item link ="/">CheckOut</Item>
    </ul>
);

export default navItem;
