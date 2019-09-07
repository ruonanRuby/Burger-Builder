import React, { Component } from 'react';

import Hoc from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const Ingredient_Price = {
    salad: 0.6,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 1,
                bacon: 0,
                cheese: 0,
                meat: 1
            },
            totalPrice: 6.5,
            purchasable: true,
            purchased: false,
        };
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = newCount;
        const priceAddition = Ingredient_Price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient })
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = newCount;
        const priceDeduction = Ingredient_Price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient })
        this.updatePurchaseState(updatedIngredient);
    }

    purchasedHandler = () => {
        this.setState({ purchased: true });
    }

    purchasedCancelHandler = () => {
        this.setState({ purchased: false });
    }

    purchasedCountinueHandler = () => {
        const order = {
            ingredient: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Name',
                address: {
                    street: 'testStreet',
                    zipCode: '12345',
                    phoneNumber: '123444444',
                },
                emial: '5421@qwqe'
            }
        }
        axios.post('/orders.json', order)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Hoc>
                <Modal show={this.state.purchased} modalClosed={this.purchasedCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        price = {this.state.totalPrice}
                        purchaseCancel = {this.purchasedCancelHandler} 
                        purchaseCountinue = {this.purchasedCountinueHandler}/> </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasedHandler} />
            </Hoc>
        );
    }
}

export default BurgerBuilder;