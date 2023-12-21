import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/users/signin`,
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.getCurrentUser.initiate(null));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `/users/signup`,
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.getCurrentUser.initiate(null));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    logout: builder.query({
      query: () => `/users/signout`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery /* Lazy because we need to execute this query conditionally (eg: while clicking a button) */,
} = authApi;
