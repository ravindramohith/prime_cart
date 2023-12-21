import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: `/products`,
      }),
    }),
    getProduct: builder.query({
      query: (params) => ({
        url: `/products/${params?.id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery,useGetProductQuery } = productApi;
