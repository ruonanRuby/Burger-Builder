import React from 'react';
import classes from './BuildControls.module.css';
import SingleControl from './SingleControl/SingleControl'

const controls = [
    {label: 'salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Tomato', type: 'tomato'},
    {label: 'Pickle', type: 'pickle'},
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <h3>Current Price: ${props.totalPrice.toFixed(2)}</h3>
        <div className = {classes.container}>{controls.map(ctrl => (
            <SingleControl 
                key = {ctrl.label} 
                label = {ctrl.label} 
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />
        ))}</div>
        <button className = {classes.OrderButton}
                disabled={!props.purchasable}
                onClick = {props.ordered}>{props.isAuth ? 'Order Now' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;