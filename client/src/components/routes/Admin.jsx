import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import Dashboard from '../admin/Dashboard'
import AdminProducts from '../admin/AdminProducts'
import NewProduct from '../admin/NewProduct'
import UpdateProduct from '../admin/UpdateProduct'
import UploadImages from '../admin/UploadImages'

const Admin = () => {
    return (
        <>
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute admin>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products"
                element={
                    <ProtectedRoute admin>
                        <AdminProducts />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/product/new"
                element={
                    <ProtectedRoute admin>
                        <NewProduct />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products/:id"
                element={
                    <ProtectedRoute admin>
                        <UpdateProduct />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products/:id/upload_images"
                element={
                    <ProtectedRoute admin>
                        <UploadImages />
                    </ProtectedRoute>
                }
            />
        </>
    )
}

export default Admin