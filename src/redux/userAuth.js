import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = ''
            state.token = action.payload
        },
        removeAuthToken: (state) => {
            state.token = ''
        }
    }
});

// Action creators are generated for each case reducer function
export const { setAuthToken, removeAuthToken } = authSlice.actions;

export default authSlice.reducer;