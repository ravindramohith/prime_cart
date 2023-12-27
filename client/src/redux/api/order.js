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
    myOrders: builder.query({
      query: () => ({
        url: `orders/my/orders`,
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
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

export const {
  useCreateOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useGetOrderQuery,
} = orderApi;
