import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/users/me`,
      transformResponse: (responseData) => responseData.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // queryFulfilled is the return value of transformResponse.. So in this case, data = responseData.data(i.e, user)
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
