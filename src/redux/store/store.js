import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../slices/appSlice'
import productReducer from '../slices/productSlice'
import filterReducer from '../slices/filterSlice'
import basketSlice from '../slices/basketSlice'
import checkoutSlice from '../slices/checkoutSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        products: productReducer,
        filter: filterReducer,
        basket: basketSlice,
        checkout: checkoutSlice
    }
})