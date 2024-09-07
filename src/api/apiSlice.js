import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* (подключаем в store как редьюсер, хотя, как таковых, состояний не имеет, работает с данными из БД, которые сразу обрабатывает и кеширует) */
export const apiSlice = createApi({
    reducerPath: "api", /* (name редьюсера(получится store.api)) */
    baseQuery: fetchBaseQuery({ /* (через усовершенствованную фетч-функцию подключаем базовый URL для запросов) */
        baseUrl: "http://localhost:3001"
    }),
    tagTypes: ["Heroes"], /* (массив с тегами, далее используем для связки эндпоинтов - при добавлении/удалении героя будет отправлять новый запрос) */
    endpoints: (builder) => ({ /* (с помощью билдера создаем эндпоинты) */
        getHeroes: builder.query({ /* (эндпоинт getHeroes, будет просто запрашивать данные(функция query)) */
            query: () => "/heroes", /* (через функцию передаем адрес эндпоинта(строка добавится к baseUrl)) */
            providesTags: ["Heroes"]
        }),
        createHero: builder.mutation({ /* (эндпоинт createHero, c помощью метода mutation добавит нового героя) */
            query: (hero) => ({ /* (функция примет обьект для добавления(hero)) */
                url: "/heroes",
                method: "POST",
                body: hero /* (в json трансформирует автоматически) */
            }),
            invalidatesTags: ["Heroes"]
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Heroes"]
        })
    })
})

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice; /* (на основе каждого эндпоинта генерируется хук - название начинается с use, далее наше название(getHeroes) и тип действия - в д.с query - просто запрос, экспортируем, подключаем в HeroesList.js, создание героя - в HeroesAddForm.js) */