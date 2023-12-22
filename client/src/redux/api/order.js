import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: `/payments/checkout_session`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useStripeCheckoutSessionMutation } =
  orderApi;
