import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        recent: [],
        keyword: '',
        brand: '',
        minPrice: 0,
        maxPrice: 0,
        sortBy: ''
    },
    reducers: {
        setTextFilter: (state, action) => {
            return {
                ...state,
                recent: (!!state.recent.find((n) => n === action.payload) || action.payload === '') ? state.recent : [action.payload, ...state.recent],
                keyword: action.payload
            };
        },
        setBrandFilter: (state, action) => {
            return {
                ...state,
                brand: action.payload
            };
        },
        setMinPriceFilter: (state, action) => {
            return {
                ...state,
                maxPrice: action.payload
            };
        },
        setMaxPriceFilter: (state, action) => {
            return {
                ...state,
                minPrice: action.payload
            };
        },
        resetFilter: (state, action) => {
            return {};
        },
        clearRecentSearch: (state, action) => {
            return {
                ...state,
                recent: []
            };
        },
        removeSelectedRecent: (state, action) => {
            return {
                ...state,
                recent: state.recent.filter((item) => item !== action.payload)
            };
        },
        applyFilter: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },

    },
})

export const { setTextFilter, setBrandFilter, setMinPriceFilter, setMaxPriceFilter, resetFilter, clearRecentSearch, removeSelectedRecent, applyFilter } = filterSlice.actions

export default filterSlice.reducer