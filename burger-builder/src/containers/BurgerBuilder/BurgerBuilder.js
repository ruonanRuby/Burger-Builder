import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hoc from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/action';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: false,
            loading:false,
            error: false
        };
    }

    
    updatePurchaseState(ingredients) {
        const sum = Object.keys( ingredients )
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0 ;
    }

    purchasedHandler = () => {
        this.setState({ purchased: true });
    }

    purchasedCancelHandler = () => {
        this.setState({ purchased: false });
    }

    purchasedCountinueHandler = () => {
        this.props.history.push( '/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error? <p>Ingredient can't be loaded!</p> : <Spinner />;
        if ( this.props.ings) {
            burger = (
                <Hoc>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    totalPrice={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchasedHandler} />
                </Hoc>
            );
            orderSummary =  <OrderSummary ingredients={this.props.ings} 
                price = {this.props.totalPrice}
                purchaseCancel = {this.purchasedCancelHandler} 
                purchaseCountinue = {this.purchasedCountinueHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
 
        return (
            <Hoc>
                <Modal show={this.state.purchased} modalClosed={this.purchasedCancelHandler}>
                   {orderSummary} </Modal>
                {burger}                
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingreName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingreName}),
        onIngredientRemoved: (ingreName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingreName})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
