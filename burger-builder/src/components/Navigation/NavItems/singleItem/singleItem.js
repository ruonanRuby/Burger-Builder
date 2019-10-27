import React from 'react';
import { NavLink } from 'react-router-dom';
import './singleItem.css';

const singleItem = (props) => (
    <li className = "item">
        <NavLink
            to={props.link} 
            exact = {props.exact} 
            activeClassName = "active"> {props.children} </NavLink>
    </li>
)

export default singleItem;