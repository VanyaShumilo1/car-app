import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";


export const fetchCars = createAsyncThunk('/car/fetchCars', async () => {
    const {data} = await axios.get('/car')
    return data
})

const initialState = {
    cars: {
        items: [],
        status: 'loading'
    }
}

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducer: {},
    extraReducers: {
        //cars
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
        }
    }
})

export const carReducer = carSlice.reducer