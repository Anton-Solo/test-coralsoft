import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatModel } from "../interfaces";

export const catsApi = createApi({
	reducerPath: "catsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_CAT_API_BASE_URL,
	}),
	endpoints: (builder) => ({
		getBreeds: builder.query<CatModel[], void>({
			query: () => "/breeds?limit=12",
		}),
	}),
});

export const { useGetBreedsQuery } = catsApi;
