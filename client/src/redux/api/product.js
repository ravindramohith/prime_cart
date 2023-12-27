import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: `/products`,
        params: {
          page: params?.page,
          itemsPerPage: params?.keyword ? 3 : params?.itemsPerPage,
          keyword: params?.keyword,
          "price[gte]": params?.min,
          "price[lte]": params?.max,
          category: params?.category,
          "ratings[gte]": params?.ratings,
        },
      }),
    }),
    getProduct: builder.query({
      query: (params) => ({
        url: `/products/${params?.id}`,
      }),
      providesTags: ["Product"],
    }),
    submitReview: builder.mutation({
      query: (body) => ({
        url: `/reviews/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSubmitReviewMutation,
} = productApi;
