import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        requestStatus: null,
        loading: false
    },
    reducers: {
        loading: (state, action) => {
            state.loading = action.payload
        },
        requestStatus: (state, action) => {
            state.requestStatus = action.payload
        }
    },
})

export const { loading, requestStatus } = appSlice.actions

export default appSlice.reducer