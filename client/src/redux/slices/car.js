import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";


export const fetchCars = createAsyncThunk('/car/fetchCars', async () => {
    const {data} = await axios.get('/car')
    return data
})

export const fetchOutgoings = createAsyncThunk('/car/outgoings', async () => {
    const {data} = await axios.get('/outgoing')
    return data
})

const initialState = {
    cars: {
        items: [],
        status: 'loading'
    },
    outgoings: {
        items: [],
        status: 'loading'
    }
}

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducer: {},
    extraReducers: {
        //get cars
        [fetchCars.pending]: (state) => {
            state.cars.items = []
            state.cars.status = 'loading'
        },
        [fetchCars.fulfilled]: (state, action) => {
            state.cars.items = action.payload.cars
            state.cars.status = 'loaded'
        },
        [fetchCars.rejected]: (state) => {
            state.cars.items = []
            state.cars.status = 'error'
        },

        //get outgoings
        [fetchOutgoings.pending]: (state) => {
            state.outgoings.items = []
            state.outgoings.status = 'loading'
        },
        [fetchOutgoings.fulfilled]: (state, action) => {
            state.outgoings.items = action.payload
            state.outgoings.status = 'loaded'
        },
        [fetchOutgoings.rejected]: (state) => {
            state.outgoings.items = []
            state.outgoings.status = 'error'
        },

    }
})

export const carReducer = carSlice.reducer