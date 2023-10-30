import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postsSlice from './postsSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authSlice,
  posts: postsSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    // devTools:false
});

const persistor = persistStore(store);
export { store, persistor };

export type Dispatch = typeof store.dispatch;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;