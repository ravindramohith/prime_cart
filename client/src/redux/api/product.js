import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product", "AdminProducts"],
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
    checkReview: builder.query({
      query: (productId) => ({
        url: `/reviews/check_review/?productId=${productId}`,
        method: "GET",
      }),
    }),
    getProductsAdmin: builder.query({
      query: () => `/products/get/admin`,
      providesTags: ["AdminProducts"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `/products/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminProducts"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSubmitReviewMutation,
  useCheckReviewQuery,
  useGetProductsAdminQuery,
  useCreateProductMutation,
} = productApi;
