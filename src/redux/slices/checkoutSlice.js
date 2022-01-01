import { createSlice } from '@reduxjs/toolkit'

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shipping: {},
        payment: {
            type: 'paypal',
            name: '',
            cardnumber: '',
            expiry: '',
            ccv: ''
        }
    },
    reducers: {
        setCheckOutShippingDetails: (state, action) => {
            return {
                ...state,
                shipping: action.payload
            };
        },
        setCheckOutPaymentDetails: (state, action) => {
            return {
                ...state,
                payment: action.payload
            };
        },
        resetCheckout: (state, action) => {
            return {};
        }
    },
})

export const { setCheckOutShippingDetails, setCheckOutPaymentDetails, resetCheckout } = checkoutSlice.actions

export default checkoutSlice.reducer