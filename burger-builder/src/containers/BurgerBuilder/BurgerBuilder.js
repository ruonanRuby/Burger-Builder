import React, { Component } from 'react';

import Hoc from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';

const Ingredient_Price = {
    salad: 1.0,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.2,
    tomato: 0.7,
    pickle: 0.4,
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 1,
                tomato: 0,
                pickle: 0,
            },
            totalPrice: 6.5,
            purchasable: true,
            purchased: false,
            loading:false,
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
        this.setState({ loading :true});
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
                .then(response => {
                    this.setState({ loading: false, purchased: false });
                })
                .catch(error => {
                    this.setState({ loading: false, purchased:false });
                });
        
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =  <OrderSummary ingredients={this.state.ingredients} 
        price = {this.state.totalPrice}
        purchaseCancel = {this.purchasedCancelHandler} 
        purchaseCountinue = {this.purchasedCountinueHandler}/>;
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        return (
            <Hoc>
                <Modal show={this.state.purchased} modalClosed={this.purchasedCancelHandler}>
                   {orderSummary} </Modal>
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

export default errorHandler(BurgerBuilder, axios);