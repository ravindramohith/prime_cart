import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Order", "AdminOrders"],
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
      providesTags: ["Order"],
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: `/payments/checkout_session`,
        method: "POST",
        body,
      }),
    }),
    getSales: builder.query({
      query: ({ startDate, endDate }) =>
        `orders/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAdminOrders: builder.query({
      query: () => `orders/`,
      providesTags: ["AdminOrders"],
    }),
    processOrder: builder.mutation({
      query: ({ body, id }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminOrders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useGetOrderQuery,
  useLazyGetSalesQuery,
  useGetAdminOrdersQuery,
  useProcessOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
