import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import userauthReducer from './userAuth';

const reducer_all = combineReducers({
    counter: counterReducer,
    user_auth: userauthReducer,
});

const store = configureStore({
    reducer: reducer_all
});

export default store;