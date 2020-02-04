import React from 'react';
import classes from './NavItems.module.css';
import Item from './singleItem/singleItem';

const navItem = (props) => (
    <ul className = {classes.NavItems}>
       <Item link="/" exact>Burger Builder</Item>
       { props.isAuthenticated ? <Item link ="/orders">Orders</Item> : null }
       { props.isAuthenticated 
            ? <Item link ="/logout">Logout</Item>
            : <Item link ="/auth">Authenticate</Item> }
    </ul>
);

export default navItem;
