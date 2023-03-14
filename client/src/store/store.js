import { configureStore } from "@reduxjs/toolkit";

import loginSlice from './loginSlice';
import userReducer from './userSlice'
import authReducer from './authSlice'

const store=configureStore({
    reducer:{
        login:loginSlice,
        user: userReducer,
        auth: authReducer,
        }
});

export default store;