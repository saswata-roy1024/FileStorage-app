import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tabsReducer from '../Slices/tabsSlice';
import filesReducer from '../Slices/filesSlice';
import searchReducer from '../Slices/searchSlice';
import dropdownReducer from '../Slices/dropdownSlice';
import userReducer from '../Slices/userSlice';
import sortByReducer from '../Slices/sortBySlice';
import savesReducer from '../Slices/savesSlice';
import viewReducer from '../Slices/viewSlice';
import darkModeReducer from '../Slices/darkModeSlice';

const rootReducer = combineReducers({
    tabs: tabsReducer,
    files: filesReducer,
    search: searchReducer,
    dropdown: dropdownReducer,
    user: userReducer,
    sortBy: sortByReducer,
    saves: savesReducer,
    view: viewReducer,
    darkMode: darkModeReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['tabs', 'search', 'dropdown'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
