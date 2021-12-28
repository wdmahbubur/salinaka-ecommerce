import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

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

        }
    },
})

export const { setTextFilter } = filterSlice.actions

export default filterSlice.reducer