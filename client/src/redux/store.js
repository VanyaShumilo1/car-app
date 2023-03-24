import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth.js";
import {carReducer} from "./slices/car.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        car: carReducer
    }
})

export default store