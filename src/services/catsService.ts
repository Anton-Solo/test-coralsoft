import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatModel } from "../interfaces";

export const catsApi = createApi({
	reducerPath: "catsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.thecatapi.com/v1",
	}),
	endpoints: (builder) => ({
		getBreeds: builder.query<CatModel[], void>({
			query: () => "/breeds?limit=10",
		}),
	}),
});

export const { useGetBreedsQuery } = catsApi;
