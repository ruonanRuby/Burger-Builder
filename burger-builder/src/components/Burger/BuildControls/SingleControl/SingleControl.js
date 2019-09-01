import React from 'react';
import './SingleControl.css';

const singleControl = (props) => (
    <div className ="SingleControl">
        <div className = "Label">{props.label} </div>
        <button 
            className = "More" 
            onClick = {props.added}>add</button>
        <button 
            className = "Less"
            onClick = {props.removed}
            disabled = {props.disabled}>remove</button>
    </div>
);

export default singleControl;
