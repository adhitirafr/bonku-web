import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import counterReducer from './counter';
import userauthReducer from './userAuth';

const reducers = combineReducers({
    counter: counterReducer,
    user: userauthReducer,
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.REACT_APP_NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;