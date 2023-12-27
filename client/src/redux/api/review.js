import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/reviews" }),
  endpoints: (builder) => ({
    submitReview: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useSubmitReviewMutation } = reviewApi;
