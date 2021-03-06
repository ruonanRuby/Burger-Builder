import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hoc from '../../hoc/Hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: false
        };
    }

    componentDidMount () {
        this.props.onInitIngredients();
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
        if (this.props.isAuthenticated) {
            this.setState( { pruchasing: true} );
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        this.setState({ purchased: true });
    }

    purchasedCancelHandler = () => {
        this.setState({ purchased: false });
    }

    purchasedCountinueHandler = () => {
        this.props.onInitPurchase();
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
        let burger = this.props.error? <p>Ingredient can't be loaded!</p> : <Spinner />;
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
                    ordered={this.purchasedHandler} 
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                    />
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
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingreName) => dispatch(actions.addIngredient(ingreName)),
        onIngredientRemoved: (ingreName) => dispatch(actions.removeIngredient(ingreName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
