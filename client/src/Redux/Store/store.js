import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tabsReducer from '../Slices/tabsSlice';
import filesReducer from '../Slices/filesSlice';
import searchReducer from '../Slices/searchSlice';
import dropdownReducer from '../Slices/dropdownSlice';



const rootReducer = combineReducers({
  tabs: tabsReducer,
  files: filesReducer,
  search: searchReducer,
  dropdown: dropdownReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['tabs', 'search', 'dropdownReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);