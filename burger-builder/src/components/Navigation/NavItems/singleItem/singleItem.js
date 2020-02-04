import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './singleItem.module.css';

const singleItem = (props) => (
    <li className = {classes.item}>
        <NavLink
            to={props.link} 
            exact = {props.exact} 
            activeClassName = {classes.active}> {props.children} </NavLink>
    </li>
)

export default singleItem;