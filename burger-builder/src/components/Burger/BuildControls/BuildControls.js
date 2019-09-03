import React from 'react';
import './BuildControls.css';
import SingleControl from './SingleControl/SingleControl'

const controls = [
    {label: 'salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className = "BuildControls">
        <h3>Current Price: ${props.totalPrice.toFixed(2)}</h3>
        {controls.map(ctrl => (
            <SingleControl 
                key = {ctrl.label} 
                label = {ctrl.label} 
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />
        ))}
        <button className = "OrderButton"
                disabled={!props.purchasable}
                onClick = {props.ordered}>Order Now</button>
    </div>
);

export default buildControls;