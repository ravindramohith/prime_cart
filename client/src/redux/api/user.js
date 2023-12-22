import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["getCurrentUser"], // declare tags
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/users/me`,
      transformResponse: (responseData) => responseData.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // queryFulfilled is the return value of transformResponse.. So in this case, data = responseData.data(i.e, user)
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (e) {
          dispatch(setLoading(false));
          console.log(e);
        }
      },
      providesTags: ["getCurrentUser"], // give this endpoint a tag
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["getCurrentUser"], // fire the functions which have tags which are provided in the array just after finishing this endpoint
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/users/me/uploadAvatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["getCurrentUser"], // fire the functions which have tags which are provided in the array just after finishing this endpoint
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/users/me/updatePassword",
        method: "PUT",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/users/password/forgot",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
} = userApi;
