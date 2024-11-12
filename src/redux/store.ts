import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { settingsReducer } from './features/settings/settingsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const combinedReducers = combineReducers({
    settings: settingsReducer
});

const rootReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ["settings"],
    },
    combinedReducers
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;