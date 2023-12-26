import {createSlice,configureStore} from '@reduxjs/toolkit';

const userslice = createSlice({
    name: 'user',
    initialState: {
        isloggedin: false
    },
    reducers: {
        login: (state) => {
            state.isloggedin = true;
        },
        logout: (state) => {
            state.isloggedin = false;
        }
    }
});

export const useractions = userslice.actions;

export const store = configureStore({
    reducer: {
        user: userslice.reducer
    }
});