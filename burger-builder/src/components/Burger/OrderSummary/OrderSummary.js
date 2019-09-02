import React from 'react';

import Hoc from '../../../hoc/Hoc';

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
            <p>Countinue to Checkout? </p>
        </Hoc>
    )
};

export default orderSummary;