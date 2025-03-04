import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh";

export const nytApi = createApi({
  reducerPath: "nytApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getNewsByDate: builder.query({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${API_KEY}`,
    }),
  }),
});

export const { useGetNewsByDateQuery } = nytApi;
