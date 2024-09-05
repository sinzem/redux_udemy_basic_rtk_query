import { configureStore } from '@reduxjs/toolkit';
import heroes from "../components/heroesList/heroesSlice"; 
import filters from "../components/heroesFilters/filtersSlice"; 
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (next) => (action) => { 
    if (typeof action === 'string') { 
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({ 
    reducer: {heroes,
              filters,
              [apiSlice.reducerPath]: apiSlice.reducer}, /* (подключаем редьюсер из apiSlice, путь генерируем динамически) */
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
                                                               stringMiddleware, 
                                                               apiSlice.middleware), /* (миддлвер для работы RTKQuery) */
    devTools: process.env.NODE_ENV !== "production", 
})

export default store;