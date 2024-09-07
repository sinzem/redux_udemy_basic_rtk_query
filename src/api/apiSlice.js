import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", /* (name редьюсера(получится store.api)) */
    baseQuery: fetchBaseQuery({ /* (через усовершенствованную фетч-функцию подключаем базовый URL для запросов) */
        baseUrl: "http://localhost:3001"
    }),
    endpoints: (builder) => ({ /* (с помощью билдера создаем эндпоинты) */
        getHeroes: builder.query({ /* (эндпоинт getHeroes, будет просто запрашивать данные(функция query)) */
            query: () => "/heroes" /* (через функцию передаем адрес эндпоинта(строка добавится к baseUrl)) */
        }),
        createHero: builder.mutation({ /* (эндпоинт createHero, будет просто запрашивать данные(функция query)) */
            query: (hero) => ({
                url: "/heroes",
                method: "POST",
                body: hero
            })
        })
    })
})

export const {useGetHeroesQuery} = apiSlice; /* (на основе каждого эндпоинта генерируется хук - название начинается с use, далее наше название(getHeroes) и тип действия - в д.с query - просто запрос, экспортируем, подключаем в HeroesList.js) */