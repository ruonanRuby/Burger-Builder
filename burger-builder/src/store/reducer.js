import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 1,
        tomato: 0,
        pickle: 0,
    },
    totalPrice: 6.5

};

const Ingredient_Price = {
    salad: 1.0,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.2,
    tomato: 0.7,
    pickle: 0.4,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + Ingredient_Price[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                 totalPrice: state.totalPrice - Ingredient_Price[action.ingredientName],
            };
        default:
            return state;

    }
};

export default reducer;