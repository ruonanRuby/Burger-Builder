import * as actionTypes from '../actions/actionType';
import { updateObject } from '../../Shared/Utility';

const initialState = {
    ingredients: null,
    totalPrice: 6.5,
    error: false,
    building: false 
};

const Ingredient_Price = {
    salad: 1.0,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.2,
    tomato: 0.7,
    pickle: 0.4,
};

const ingredientAdd = (state, action) => {
    const addedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const addedIngredients = updateObject(state.ingredients, addedIngredient);
    const addedState = {
        ingredients: addedIngredients,
        totalPrice: state.totalPrice + Ingredient_Price[action.ingredientName],
    };
    return updateObject(state, addedState);
}

const ingredientRemove = (state, action) => {
    const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const removedIngredients = updateObject(state.ingredients, removedIngredient);
    const removedState = {
        ingredients: removedIngredients,
        totalPrice: state.totalPrice + Ingredient_Price[action.ingredientName],
        building: true,
    };
    return updateObject(state, removedState);
};

const ingredientSet = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            tomato: action.ingredients.tomato,
            pickle: action.ingredients.pickle
        },
        totalPrice:6.5,
        error: false,
        building: false
    });
};

const ingredientFailed = (state, action) => { return updateObject( state, {error: true}); };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return ingredientAdd(state, action); 
        case actionTypes.REMOVE_INGREDIENT: return ingredientRemove(state, action);
        case actionTypes.SET_INGREDIENTS: return ingredientSet(state, action);      
        case actionTypes.FETCH_INGREDIENTS_FAILED: return ingredientFailed(state, action);
        default: return state;
    }
};

export default reducer;