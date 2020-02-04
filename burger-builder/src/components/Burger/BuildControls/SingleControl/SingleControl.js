import React from 'react';
import classes from './SingleControl.module.css';

const singleControl = (props) => (
    <div className = {classes.SingleControl}>
        <div className = {classes.Label}>{props.label} </div>
        <button 
            className = {classes.More} 
            onClick = {props.added}>add</button>
        <button 
            className = {classes.Less}
            onClick = {props.removed}
            disabled = {props.disabled}>remove</button>
    </div>
);

export default singleControl;
