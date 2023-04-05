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

export const fetchOutgoingsFromCar = createAsyncThunk('car/carid/', async (carId) => {
    const {data} = await axios.get(`outgoing/carid/${carId}`)
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
    },
    currentCar: {}
}

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        changeCurrentCar(state, action) {
            state.currentCar = action.payload
        }
    },
    extraReducers: {
        //get cars
        [fetchCars.pending]: (state) => {
            state.cars.items = []
            state.cars.status = 'loading'
        },
        [fetchCars.fulfilled]: (state, action) => {
            state.cars.items = action.payload.cars
            state.currentCar = action.payload.cars[0]
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
            state.outgoings.items = action.payload.outgoings
            state.outgoings.status = 'loaded'
        },
        [fetchOutgoings.rejected]: (state) => {
            state.outgoings.items = []
            state.outgoings.status = 'error'
        },

        //fetchOutgoingsFromCar
        [fetchOutgoingsFromCar.pending]: (state) => {
            state.outgoings.items = []
            state.outgoings.status = 'loading'
        },
        [fetchOutgoingsFromCar.fulfilled]: (state, action) => {
            state.outgoings.items = action.payload.outgoings
            state.outgoings.status = 'loaded'
        },
        [fetchOutgoingsFromCar.rejected]: (state) => {
            state.outgoings.items = []
            state.outgoings.status = 'error'
        },
    }
})

export const carReducer = carSlice.reducer
export const {changeCurrentCar} = carSlice.actions