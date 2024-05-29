import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tabsReducer from '../Slices/tabsSlice';
import filesReducer from '../Slices/filesSlice';



const rootReducer = combineReducers({
  tabs: tabsReducer,
  files: filesReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['tabs'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);