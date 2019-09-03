import React from 'react';
import './singleItem.css';

const singleItem = (props) => (
    <li className = "item">
        <a href = {props.link}
            className = {props.active? "active": null}> {props.children} </a></li>
)

export default singleItem;