import React from 'react';
import './Burger.css';
import BurgerIngredient from './Ingredients/Ingredients';

const burger = (props) => {
    let AddedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_,i) => {
                    return <BurgerIngredient key={igKey + i} type= {igKey} />
                });
            })
            .reduce((arr,el) => {
                return arr.concat(el)
            }, []);
    if (AddedIngredients.length === 0) {
        AddedIngredients = <p>Please start adding the ingredients!</p>
    }
    return (
        <div className = "Burger">
            <BurgerIngredient type = "bread-top" />
            {AddedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div> 
    );

};

export default burger; 