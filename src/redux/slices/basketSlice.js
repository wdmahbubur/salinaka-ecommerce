import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        setBasketItems: (state, action) => {
            return action.payload
        },
        dispatchAddToBasket: (state, action) => {
            return state.some((product) => product._id === action.payload._id) ? state : [action.payload, ...state];
        },
        removeFromBasket: (state, action) => {
            return state.filter((product) => product._id !== action.payload);
        },
        clearBasket: (state, action) => {
            return state = [];
        },
        addQtyItem: (state, action) => {
            return state.map((product) => {
                if (product._id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    };
                }
                return product;
            });
        },
        minusQtyItem: (state, action) => {
            return state.map((product) => {
                if (product._id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    };
                }
                return product;
            });
        }
    },
})

export const { setBasketItems, dispatchAddToBasket, removeFromBasket, clearBasket, addQtyItem, minusQtyItem } = basketSlice.actions

export default basketSlice.reducer