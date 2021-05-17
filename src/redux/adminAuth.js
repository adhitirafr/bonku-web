import { createSlice } from '@reduxjs/toolkit'

export const adminAuth = createSlice({
    name: 'admin',
    initialState: {
        token: '',
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload
        },
        removeAuthToken: (state) => {
            state.token = ''
        },
    }
});

export const { setAuthToken, removeAuthToken } = adminAuth.actions;

export default adminAuth.reducer;