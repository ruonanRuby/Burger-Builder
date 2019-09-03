import React from 'react';

import Hoc from '../../../hoc/Hoc';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => { 
            return (
             <li key = {igKey}><span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        )});
    return (
        <Hoc>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Countinue to Checkout? </p>
            <Button btnType = "Danger" clicked = {props.purchaseCancel}>Cancel</Button>
            <Button btnType = "Success" clicked = {props.purchaseCountinue}>Check Out </Button>
        </Hoc>
    )
};

export default orderSummary;