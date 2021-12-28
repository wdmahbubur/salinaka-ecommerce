import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        setBasketItems: (state, action) => {
            state = action.payload
        },
        dispatchAddToBasket: (state, action) => {
            state = state.some((product) => product._id === action.payload.id) ? state : [action.payload, ...state];
        },
        removeFromBasket: (state, action) => {
            state = state.filter((product) => product._id !== action.payload);
        },
        clearBasket: (state, action) => {
            state = [];
        },
        addQtyItem: (state, action) => {
            state = state.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    };
                }
                return product;
            });
        },
        minusQtyItem: (state, action) => {
            state = state.map((product) => {
                if (product.id === action.payload) {
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