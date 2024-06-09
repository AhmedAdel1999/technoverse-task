import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import cartSlice from '../features/cartSlice'
import productSlice from '../features/productSlice';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const reducers:any = combineReducers({
    cart: cartSlice,
    product:productSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: _persistedReducer,
});


export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch



