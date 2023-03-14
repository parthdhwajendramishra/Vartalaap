import {createSlice} from '@reduxjs/toolkit';


const loginSlice=createSlice({

    name:'login',
    initialState:{isLogin:false},
    reducers:{
        loggingIn(state){
            state.isLogin=!state.isLogin;
        }
    }
});


export const loginActions=loginSlice.actions;

export default loginSlice.reducer;