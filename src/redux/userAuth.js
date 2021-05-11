import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth_token',
    initialState: {
        auth_token: '',
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.auth_token.push(action.payload)
        },
        removeAuthToken: (state) => {
            state.auth_token = ''
        }
    }
});

// Action creators are generated for each case reducer function
export const { setAuthToken, removeAuthToken } = authSlice.actions;

export default authSlice.reducer;