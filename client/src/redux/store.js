import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/product";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";

import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
});
