import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/product";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";

import userReducer from "./features/userSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartSlice,
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
