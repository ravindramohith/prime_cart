import React from 'react'
import { Route } from 'react-router-dom';

import Home from "../Home";
import ProductDetails from "../product/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethods from "../cart/PaymentMethods";
import MyOrders from "../order/MyOrders";
import Order from "../order/Order";
import Invoice from "../invoice/Invoice";

const User = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route
                path="/me/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/me/update_profile"
                element={
                    <ProtectedRoute>
                        <UpdateProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/me/upload_avatar"
                element={
                    <ProtectedRoute>
                        <UploadAvatar />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/me/update_password"
                element={
                    <ProtectedRoute>
                        <UpdatePassword />
                    </ProtectedRoute>
                }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
                path="/shipping"
                element={
                    <ProtectedRoute>
                        <Shipping />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/confirm_order"
                element={
                    <ProtectedRoute>
                        <ConfirmOrder />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/payment_method"
                element={
                    <ProtectedRoute>
                        <PaymentMethods />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/me/orders"
                element={
                    <ProtectedRoute>
                        <MyOrders />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/me/order/:id"
                element={
                    <ProtectedRoute>
                        <Order />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/invoice/order/:id"
                element={
                    <ProtectedRoute>
                        <Invoice />
                    </ProtectedRoute>
                }
            />
        </>
    )
}

export default User